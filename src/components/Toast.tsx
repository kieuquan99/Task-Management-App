"use client"

import type React from "react"
import { createContext, useContext, useState, useRef, useEffect } from "react"
import { Animated, StyleSheet, Text, View } from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome';

// Define toast types
export type ToastType = "success" | "error" | "info"

// Define toast data structure
interface ToastData {
  id: string
  type: ToastType
  message: string
  duration?: number
}

// Define context value type
interface ToastContextValue {
  showToast: (type: ToastType, message: string, duration?: number) => void
  hideToast: (id: string) => void
}

// Create context with default values
const ToastContext = createContext<ToastContextValue>({
  showToast: () => {},
  hideToast: () => {},
})

// Custom hook to use the toast
export const useToast = () => useContext(ToastContext)

// Toast provider component
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastData[]>([])

  // Show a new toast
  const showToast = (type: ToastType, message: string, duration = 3000) => {
    const id = Math.random().toString(36).substring(2, 9)

    setToasts((prevToasts) => [...prevToasts, { id, type, message, duration }])

    // Auto hide after duration
    if (duration > 0) {
      setTimeout(() => {
        hideToast(id)
      }, duration)
    }

    return id
  }

  // Hide a toast by id
  const hideToast = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
  }

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      <View style={styles.container}>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onHide={() => hideToast(toast.id)} />
        ))}
      </View>
    </ToastContext.Provider>
  )
}

// Individual toast item component
interface ToastItemProps {
  toast: ToastData
  onHide: () => void
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onHide }) => {
  const { type, message } = toast
  const opacity = useRef(new Animated.Value(0)).current
  const translateY = useRef(new Animated.Value(20)).current

  useEffect(() => {
    // Animate in
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start()

    // Prepare for animate out
    return () => {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: -20,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start()
    }
  }, [])

  // Get icon and background color based on type
  const getToastStyle = () => {
    switch (type) {
      case "success":
        return {
          icon: <Icon name="check-circle-o" size={20} color="#fff" />,
          backgroundColor: "#4caf50",
        }
      case "error":
        return {
          icon: <Icon name="times-circle-o" size={20} color="#fff" />,
          backgroundColor: "#f44336",
        }
      case "info":
        return {
          icon: <Icon name="info-circle" size={20} color="#fff" />,
          backgroundColor: "#2196f3",
        }
      default:
        return {
          icon: <Icon name="info-circle" size={20} color="#fff" />,
          backgroundColor: "#2196f3",
        }
    }
  }

  const { icon, backgroundColor } = getToastStyle()

  return (
    <Animated.View style={[styles.toast, { backgroundColor }, { opacity, transform: [{ translateY }] }]}>
      <View style={styles.iconContainer}>{icon}</View>
      <Text style={styles.message}>{message}</Text>
      <Text onPress={onHide} style={styles.closeButton}>
        <Icon name="close" size={18} color="#fff" />
      </Text>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 60,
    left: 0,
    right: 0,
    zIndex: 999,
    alignItems: "center",
  },
  toast: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    minWidth: "80%",
    maxWidth: "90%",
  },
  iconContainer: {
    marginRight: 10,
  },
  message: {
    color: "#fff",
    flex: 1,
    fontSize: 14,
  },
  closeButton: {
    marginLeft: 10,
  },
})

