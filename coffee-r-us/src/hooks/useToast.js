// useToast.js
// Custom hook for showing temporary notification messages (toasts).
// Returns a message string and a showToast function. Components render
// the message when it is non-null and it auto-clears after 2.5 seconds.

import { useState, useCallback } from "react";

export function useToast(duration = 2500) {
  const [message, setMessage] = useState(null);

  const showToast = useCallback((msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), duration);
  }, [duration]);

  return { message, showToast };
}