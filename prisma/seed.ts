import { PrismaClient } from '@prisma/client' // Prisma 7 normal import
const prisma = new PrismaClient()

const profilesData = [
  {
    name: 'Nguyễn Văn A',
    email: 'vana@student.hcmut.edu.vn',
    role: 'student',
    faculty: 'Khoa Khoa học & Kỹ thuật Máy tính',
    major: 'Kỹ thuật Máy tính',
    class: 'KTMT2023',
    phone: '0901234567',
    supportNeeds: 'Cần hỗ trợ về Lập trình C++',
    avail: ['Thứ 2 (9:00-11:00)', 'Thứ 5 (13:00-15:00)']
  },
  {
    name: 'Trần Thị B',
    email: 'thib@tutor.hcmut.edu.vn',
    role: 'tutor',
    faculty: 'Khoa Khoa học & Kỹ thuật Máy tính',
    expertise: 'Trí tuệ nhân tạo',
    skills: ['Python', 'Machine Learning', 'Data Science'],
    rating: 4.8,
    phone: '0908765432',
    avail: ['Thứ 3 (14:00-17:00)', 'Thứ 6 (8:00-10:00)']
  },
  {
    name: 'Lê Văn C',
    email: 'levanc@tutor.hcmut.edu.vn',
    role: 'tutor',
    faculty: 'Khoa Khoa học & Kỹ thuật Máy tính',
    expertise: 'Mạng máy tính',
    skills: ['Computer Network', 'Linux', 'C'],
    rating: 4.2,
    phone: '0909988776'
  }
]

const workloads = [
  {
    tutorRefId: 1,
    tutorName: 'ThS. Nguyễn Văn A',
    tutorEmail: 'vana@uit.edu.vn',
    tutorRole: 'tutor',
    tutorMajor: 'Khoa học Máy tính',
    tutorRating: 4.7,
    totalMentees: 8,
    maxMentees: 10,
    totalSessions: 20,
    completedSessions: 16,
    totalHours: 30,
    avgCompletionRate: 80
  },
  {
    tutorRefId: 2,
    tutorName: 'ThS. Trần Thị B',
    tutorEmail: 'thib@uit.edu.vn',
    tutorRole: 'tutor',
    tutorMajor: 'Kỹ thuật Phần mềm',
    tutorRating: 4.5,
    totalMentees: 5,
    maxMentees: 10,
    totalSessions: 14,
    completedSessions: 12,
    totalHours: 21,
    avgCompletionRate: 86
  }
]

const topics = [
  {
    id: 't1',
    title: 'Hỏi về đề thực hành hệ điều hành',
    author: 'An',
    createdAt: new Date('2025-10-20')
  },
  {
    id: 't2',
    title: 'Tài liệu C++ nâng cao',
    author: 'Bình',
    createdAt: new Date('2025-10-21')
  }
]

const comments = [
  {
    id: 'c1',
    topicId: 't1',
    author: 'Bình',
    content: 'Bạn có thể xem slide tuần 6, phần semaphore nhé!',
    createdAt: new Date('2025-10-21'),
    level: 0,
    parentId: null
  },
  {
    id: 'c2',
    topicId: 't1',
    author: 'An',
    content: 'Cảm ơn bạn nhiều nha!',
    createdAt: new Date('2025-10-21'),
    level: 1,
    parentId: 'c1'
  }
]

const sessionsData = [
  {
    programId: 101,
    tutorId: 2,
    studentId: 11,
    mode: 'offline',
    location: 'A4-501',
    time: new Date('2025-11-01T14:00:00'),
    status: 'confirmed',
    subject: 'Toán cao cấp',
    createdAt: new Date('2025-10-25'),
    confirmedAt: new Date('2025-10-26')
  },
  {
    programId: 102,
    tutorId: 2,
    studentId: 1,
    mode: 'online',
    location: 'https://meet.google.com/abc',
    time: new Date('2025-11-03T09:00:00'),
    status: 'pending',
    subject: 'Cấu trúc dữ liệu',
    createdAt: new Date('2025-10-27')
  },
  {
    programId: 103,
    tutorId: 4,
    studentId: 11,
    mode: 'offline',
    location: 'B4-205',
    time: new Date('2025-10-20T10:00:00'),
    status: 'completed',
    subject: 'Mạng máy tính',
    createdAt: new Date('2025-10-10'),
    completedAt: new Date('2025-10-20')
  }
]

async function main() {
  await prisma.learningPreference.createMany({
    data: [
      { id: 'p1', name: 'C++', level: 60 },
      { id: 'p2', name: 'Python', level: 40 },
      { id: 'p3', name: 'Lãnh đạo nhóm', level: 30 },
      { id: 'p4', name: 'Giải tích 2', level: 70 }
    ]
  })

  await prisma.learningGoal.createMany({
    data: [
      { id: 'g1', content: 'Đạt A+ môn Cấu trúc dữ liệu' },
      { id: 'g2', content: 'Nâng cao kỹ năng Python để làm đồ án AI' }
    ]
  })

  await prisma.recommendation.createMany({
    data: [
      {
        id: 'r1',
        title: 'Bạn có vẻ đang quan tâm đến ReactJS',
        description: 'Hãy tham gia buổi tư vấn...',
        relatedSkill: 'ReactJS',
        tutor: 'Nguyễn Văn A',
        type: 'session'
      },
      {
        id: 'r2',
        title: 'Môn Giải tích 2 của bạn sắp thi',
        description: 'Dưới đây là tài liệu...',
        relatedSkill: 'Giải tích 2',
        docLink: '/library/analysis2.pdf',
        type: 'document'
      },
      {
        id: 'r3',
        title: 'Phát triển kỹ năng lãnh đạo nhóm',
        description: 'Thử tham gia Workshop "Team Leadership Fundamentals" tuần tới.',
        relatedSkill: 'Lãnh đạo nhóm',
        type: 'session',
        feedback: null
      }
    ]
  })

  await prisma.learningProgress.createMany({
    data: [
      { id: 'p1', skill: 'C++', progress: 70 },
      { id: 'p2', skill: 'Python', progress: 50 },
      { id: 'p3', skill: 'Giải tích 2', progress: 85 },
      { id: 'p4', skill: 'Lãnh đạo nhóm', progress: 40 }
    ]
  })

  await prisma.document.createMany({
    data: [
      {
        id: 'd1',
        title: 'Giáo trình Cấu trúc dữ liệu.pdf',
        size: '2.1MB',
        uploadedAt: new Date('2024-09-10'),
        author: 'TS. Nguyễn Văn A',
        subject: 'Cấu trúc dữ liệu & Giải thuật',
        topic: 'Cấu trúc dữ liệu cơ bản',
        keywords: ['CTDL', 'Linked List', 'Tree', 'Stack', 'Queue']
      },
      {
        id: 'd2',
        title: 'Bài giảng Toán rời rạc.docx',
        size: '1.5MB',
        uploadedAt: new Date('2024-08-25'),
        author: 'PGS. Trần Minh B',
        subject: 'Toán rời rạc',
        topic: 'Logic và Tập hợp',
        keywords: ['logic', 'tập hợp', 'đồ thị', 'rời rạc']
      },
      {
        id: 'd3',
        title: 'Slide Hệ điều hành.pptx',
        size: '4.2MB',
        uploadedAt: new Date('2024-09-20'),
        author: 'ThS. Lê Hoàng C',
        subject: 'Hệ điều hành',
        topic: 'Quản lý tiến trình',
        keywords: ['process', 'thread', 'scheduling', 'mutex', 'OS']
      },
      {
        id: 'd4',
        title: 'Tài liệu Mạng máy tính.pdf',
        size: '3.8MB',
        uploadedAt: new Date('2024-10-02'),
        author: 'TS. Nguyễn Quốc D',
        subject: 'Mạng máy tính',
        topic: 'Giao thức TCP/IP',
        keywords: ['network', 'TCP', 'UDP', 'IP', 'socket']
      },
      {
        id: 'd5',
        title: 'Hướng dẫn lập trình C cơ bản.pdf',
        size: '2.9MB',
        uploadedAt: new Date('2024-09-18'),
        author: 'ThS. Trần Thu E',
        subject: 'Ngôn ngữ C',
        topic: 'Cơ bản về C',
        keywords: ['C', 'programming', 'syntax', 'variable', 'loop']
      },
      {
        id: 'd6',
        title: 'Đề thi OOP 2023.docx',
        size: '800KB',
        uploadedAt: new Date('2024-08-15'),
        author: 'Khoa CNTT',
        subject: 'Lập trình Hướng đối tượng',
        topic: 'Kế thừa & Đa hình',
        keywords: ['OOP', 'C++', 'inheritance', 'polymorphism', 'encapsulation']
      },
      {
        id: 'd7',
        title: 'Lab Machine Learning.zip',
        size: '6.5MB',
        uploadedAt: new Date('2024-10-05'),
        author: 'TS. Đinh Thanh F',
        subject: 'Machine Learning',
        topic: 'Linear Regression',
        keywords: ['AI', 'ML', 'supervised', 'model', 'training']
      },
      {
        id: 'd8',
        title: 'Báo cáo Kỹ thuật phần mềm.pdf',
        size: '1.2MB',
        uploadedAt: new Date('2024-09-30'),
        author: 'SV Nguyễn Văn G',
        subject: 'Kỹ thuật phần mềm',
        topic: 'Phân tích yêu cầu',
        keywords: ['SWE', 'requirement', 'use case', 'uml']
      },
      {
        id: 'd9',
        title: 'Thực hành Cấu trúc máy tính.docx',
        size: '900KB',
        uploadedAt: new Date('2024-09-11'),
        author: 'PGS. Phạm Quang H',
        subject: 'Kiến trúc máy tính',
        topic: 'Bộ nhớ và CPU',
        keywords: ['computer', 'architecture', 'memory', 'CPU']
      },
      {
        id: 'd10',
        title: 'Hướng dẫn sử dụng Git.pdf',
        size: '3.1MB',
        uploadedAt: new Date('2024-10-10'),
        author: 'CLB Dev HCMUT',
        subject: 'Công cụ lập trình',
        topic: 'Quản lý mã nguồn',
        keywords: ['git', 'github', 'commit', 'branch', 'merge']
      }
    ]
  })

  await prisma.mentee.create({
    data: {
      name: 'Nguyễn Văn B',
      email: 'b.nguyen@example.com',
      major: 'Kỹ thuật Máy tính',
      year: 3,
      className: 'Hỗ trợ Lập trình C++ - Advanced',
      avatar: 'https://ui-avatars.com/api/?name=Nguyen+Van+B',
      phone: '0909123456',
      progress: 'Đang tham gia khóa ReactJS nâng cao',

      nextSession: {
        id: 101,
        programId: 1,
        tutorId: 10,
        studentId: 1,
        mode: 'online',
        location: 'Zoom link: https://zoom.us/j/123456789',
        time: '2025-11-03T19:00:00',
        status: 'confirmed',
        createdAt: '2025-10-20T10:00:00'
      },

      notes: {
        create: [
          {
            tutorId: 10,
            content: 'Cần hỗ trợ thêm phần async trong React.'
          }
        ]
      },

      previousFeedbacks: {
        create: [
          {
            sessionId: 99,
            rating: {
              practicalRelevance: 5,
              knowledgeLoad: 4,
              clarity: 5,
              enthusiasm: 5,
              goalTransmission: 4
            },
            comment: 'Mentee rất chăm chỉ và có tiến bộ tốt.'
          }
        ]
      }
    }
  })

  await prisma.profile.createMany({
    data: profilesData
  })

  await prisma.tutorWorkload.createMany({
    data: workloads
  })

  await prisma.topic.createMany({
    data: topics
  })

  await prisma.comment.createMany({
    data: comments
  })

  for (const s of sessionsData) {
    await prisma.session.create({ data: s })
  }

  await prisma.session.create({
    data: {
      programId: 106,
      tutorId: 2,
      studentId: 1,
      mode: 'online',
      location: 'https://meet.google.com/xyz',
      time: new Date('2025-10-15T15:00:00'),
      status: 'completed',
      subject: 'Phân tích thiết kế hệ thống',
      feedbacks: {
        create: {
          studentId: 1,
          comment: 'Buổi học ổn, có thể cải thiện phần trình bày ví dụ.',
          practicalRelevance: 4,
          knowledgeLoad: 4,
          clarity: 4,
          enthusiasm: 3,
          goalTransmission: 5
        }
      },
      tutorFeedbacks: {
        create: {
          tutorId: 2,
          studentId: 1,
          rating: 5,
          comment: 'Sinh viên tiếp thu tốt.'
        }
      }
    }
  })
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect())
