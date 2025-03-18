// import type firebase from "firebase/app"
// import type firestore from "@react-native-firebase/firestore"

// // Định nghĩa các trạng thái có thể có của dự án và đầu việc
// export enum Status {
//   NOT_STARTED = "not_started",
//   IN_PROGRESS = "in_progress",
//   COMPLETED = "completed",
//   DELAYED = "delayed",
//   CANCELLED = "cancelled",
// }

// // Định nghĩa vai trò người dùng
// export enum UserRole {
//   ADMIN = "admin",
//   MANAGER = "manager",
//   MEMBER = "member",
// }

// // Định nghĩa mức độ ưu tiên
// export enum Priority {
//   LOW = "low",
//   MEDIUM = "medium",
//   HIGH = "high",
//   URGENT = "urgent",
// }

// // Interface cho người dùng
// export interface User {
//   id: string
//   email: string
//   displayName: string
//   photoURL?: string
//   role: UserRole
//   phoneNumber?: string
//   department?: string
//   position?: string
//   createdAt: Date | firestore.Timestamp
//   lastActive?: Date | firestore.Timestamp
// }

// // Interface cho dự án
// export interface Project {
//   id: string
//   name: string
//   description: string
//   managerId: string // ID của người quản lý dự án
//   status: Status
//   startDate: Date | firestore.Timestamp
//   endDate: Date | firestore.Timestamp
//   estimatedEndDate: Date | firestore.Timestamp
//   priority: Priority
//   budget?: number
//   createdAt: Date | firestore.Timestamp
//   updatedAt: Date | firestore.Timestamp
//   completionPercentage: number // Tỷ lệ hoàn thành (0-100)
// }

// // Interface cho đầu việc
// export interface Task {
//   id: string
//   projectId: string // ID của dự án mà đầu việc thuộc về
//   name: string
//   description: string
//   status: Status
//   priority: Priority
//   startDate: Date | firestore.Timestamp
//   endDate: Date | firestore.Timestamp
//   estimatedEndDate: Date | firestore.Timestamp
//   createdAt: Date | firestore.Timestamp
//   updatedAt: Date | firestore.Timestamp
//   createdBy: string // ID của người tạo đầu việc
//   parentTaskId?: string // ID của đầu việc cha (nếu là sub-task)
//   completionPercentage: number // Tỷ lệ hoàn thành (0-100)
//   estimatedHours?: number // Số giờ ước tính để hoàn thành
//   actualHours?: number // Số giờ thực tế đã làm
// }

// // Interface cho mối quan hệ giữa dự án và thành viên
// export interface ProjectMember {
//   id: string
//   projectId: string
//   userId: string
//   role: UserRole // Vai trò trong dự án (có thể khác với vai trò hệ thống)
//   joinedAt: Date | firebase.firestore.Timestamp
//   invitedBy: string // ID của người mời
// }

// // Interface cho mối quan hệ giữa đầu việc và người được giao
// export interface TaskAssignment {
//   id: string
//   taskId: string
//   userId: string
//   assignedAt: Date | firebase.firestore.Timestamp
//   assignedBy: string // ID của người giao việc
//   isResponsible: boolean // Người chịu trách nhiệm chính
// }

// // Interface cho bình luận
// export interface Comment {
//   id: string
//   taskId: string // Hoặc projectId nếu comment thuộc về dự án
//   userId: string
//   content: string
//   createdAt: Date | firebase.firestore.Timestamp
//   updatedAt?: Date | firebase.firestore.Timestamp
//   attachments?: string[] // Mảng các URL đến tệp đính kèm
// }

// // Interface cho hoạt động (activity log)
// export interface Activity {
//   id: string
//   entityId: string // ID của dự án hoặc đầu việc
//   entityType: "project" | "task"
//   action: string // Ví dụ: 'created', 'updated', 'completed'
//   userId: string // Người thực hiện hành động
//   timestamp: Date | firebase.firestore.Timestamp
//   details?: any // Chi tiết bổ sung về hành động
// }

