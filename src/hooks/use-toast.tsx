import { useToast as useToastContext } from "../components/Toast"

// Re-export the hook for easier imports
export const useToast = () => {
  const toast = useToastContext()

  return {
    success: (message: string, duration?: number) => toast.showToast("success", message, duration),

    error: (message: string, duration?: number) => toast.showToast("error", message, duration),

    info: (message: string, duration?: number) => toast.showToast("info", message, duration),

    hide: (id: string) => toast.hideToast(id),
  }
}

