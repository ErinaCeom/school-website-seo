import { useState, useCallback, useEffect, useRef } from "react";

export type Notice = {
  id: string;
  date: string;
  category: string;
  title: string;
};

const useNotices = (initialOffset: number, limit: number) => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectMode, setSelectMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [offset, setOffset] = useState(initialOffset);
  const [hasMore, setHasMore] = useState(true);
  const abortControllerRef = useRef<AbortController | null>(null);
  const initialOffsetRef = useRef(initialOffset);
  const limitRef = useRef(limit);

  const fetchNotices = useCallback(
    async (isInitial = false) => {
      if ((loading && !isInitial) || !hasMore) return;

      setLoading(true);
      setFetchError(null);

      abortControllerRef.current?.abort();
      const controller = new AbortController();
      abortControllerRef.current = controller;

      try {
        const res = await fetch(
          `/api/notice?offset=${isInitial ? initialOffset : offset}`,
          {
            signal: controller.signal,
          },
        );

        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
        const result = await res.json();

        if (result.status === "success" && Array.isArray(result.data)) {
          setNotices((prev) =>
            isInitial ? result.data : [...prev, ...result.data],
          );
          setOffset((prev) =>
            isInitial
              ? initialOffsetRef.current + limitRef.current
              : prev + limitRef.current,
          );
          setHasMore(result.data.length >= limitRef.current);
        } else if (result.status === "empty") {
          setHasMore(false);
        } else {
          throw new Error(result.message || "Invalid response format");
        }
      } catch (err: unknown) {
        if (err instanceof Error && err.name !== "AbortError") {
          setFetchError(err.message || "Failed to load notices");
        }
      } finally {
        setLoading(false);
        abortControllerRef.current = null;
      }
    },
    [loading, hasMore, offset,initialOffset],
  );

  const fetchMoreNotices = useCallback(() => {
    if (!loading && hasMore) fetchNotices();
  }, [loading, hasMore, fetchNotices]);

  const deleteNotices = useCallback(async (ids: string[]) => {
    setDeleting(true);
    try {
      const deletePromises = ids.map((id) =>
        fetch(`/api/notice/delete?id=${id}`, { method: "DELETE" }),
      );

      await Promise.all(deletePromises);
      setNotices((prev) => prev.filter((n) => !ids.includes(n.id)));
      setSelectedIds([]);
      setSelectMode(false);
    } catch {
      throw new Error("Failed to delete notices");
    } finally {
      setDeleting(false);
    }
  }, []);

  const toggleSelect = useCallback((id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }, []);

  const enterSelectMode = useCallback(() => setSelectMode(true), []);
  const exitSelectMode = useCallback(() => {
    setSelectMode(false);
    setSelectedIds([]);
  }, []);

  useEffect(() => {
    fetchNotices(true);
    return () => abortControllerRef.current?.abort();
    //Dependency will trigger infinite loop, Leave empty.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    notices,
    selectedIds,
    selectMode,
    loading,
    deleting,
    fetchError,
    hasMore,
    toggleSelect,
    enterSelectMode,
    exitSelectMode,
    deleteNotices,
    fetchMoreNotices,
  };
};

export default useNotices;
