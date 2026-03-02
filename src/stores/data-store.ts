'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Meeting, Post, Project, Comment, ProjectApplicant } from '@/types';
import { mockMeetings, mockPosts, mockProjects } from '@/lib/mock-data';

interface DataState {
  meetings: Meeting[];
  posts: Post[];
  projects: Project[];
  _initialized: boolean;

  // Initialize with mock data
  initialize: () => void;

  // Meeting operations
  addMeeting: (meeting: Meeting) => void;
  updateMeeting: (id: string, updates: Partial<Meeting>) => void;
  deleteMeeting: (id: string) => void;
  joinMeeting: (meetingId: string, userId: string) => void;
  leaveMeeting: (meetingId: string, userId: string) => void;
  addNotice: (meetingId: string, content: string) => void;

  // Post operations
  addPost: (post: Post) => void;
  updatePost: (id: string, updates: Partial<Post>) => void;
  deletePost: (id: string) => void;
  likePost: (postId: string, userId: string) => void;
  addComment: (postId: string, comment: Comment) => void;
  deleteComment: (postId: string, commentId: string) => void;
  incrementViews: (postId: string) => void;

  // Project operations
  addProject: (project: Project) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  applyToProject: (projectId: string, applicant: ProjectApplicant) => void;
  updateApplicantStatus: (
    projectId: string,
    applicantId: string,
    status: 'accepted' | 'rejected'
  ) => void;
}

export const useDataStore = create<DataState>()(
  persist(
    (set, get) => ({
      meetings: [],
      posts: [],
      projects: [],
      _initialized: false,

      initialize: () => {
        if (get()._initialized) return;
        set({
          meetings: mockMeetings,
          posts: mockPosts,
          projects: mockProjects,
          _initialized: true,
        });
      },

      // --- Meetings ---
      addMeeting: (meeting) =>
        set((s) => ({ meetings: [meeting, ...s.meetings] })),

      updateMeeting: (id, updates) =>
        set((s) => ({
          meetings: s.meetings.map((m) => (m.id === id ? { ...m, ...updates } : m)),
        })),

      deleteMeeting: (id) =>
        set((s) => ({ meetings: s.meetings.filter((m) => m.id !== id) })),

      joinMeeting: (meetingId, userId) =>
        set((s) => ({
          meetings: s.meetings.map((m) =>
            m.id === meetingId && !m.participants.includes(userId)
              ? { ...m, participants: [...m.participants, userId] }
              : m
          ),
        })),

      leaveMeeting: (meetingId, userId) =>
        set((s) => ({
          meetings: s.meetings.map((m) =>
            m.id === meetingId
              ? { ...m, participants: m.participants.filter((p) => p !== userId) }
              : m
          ),
        })),

      addNotice: (meetingId, content) =>
        set((s) => ({
          meetings: s.meetings.map((m) =>
            m.id === meetingId
              ? {
                  ...m,
                  notices: [
                    ...m.notices,
                    { id: `n_${Date.now()}`, content, createdAt: new Date().toISOString() },
                  ],
                }
              : m
          ),
        })),

      // --- Posts ---
      addPost: (post) =>
        set((s) => ({ posts: [post, ...s.posts] })),

      updatePost: (id, updates) =>
        set((s) => ({
          posts: s.posts.map((p) =>
            p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p
          ),
        })),

      deletePost: (id) =>
        set((s) => ({ posts: s.posts.filter((p) => p.id !== id) })),

      likePost: (postId, userId) =>
        set((s) => ({
          posts: s.posts.map((p) => {
            if (p.id !== postId) return p;
            const isLiked = p.likes.includes(userId);
            return {
              ...p,
              likes: isLiked ? p.likes.filter((l) => l !== userId) : [...p.likes, userId],
            };
          }),
        })),

      addComment: (postId, comment) =>
        set((s) => ({
          posts: s.posts.map((p) =>
            p.id === postId ? { ...p, comments: [...p.comments, comment] } : p
          ),
        })),

      deleteComment: (postId, commentId) =>
        set((s) => ({
          posts: s.posts.map((p) =>
            p.id === postId
              ? { ...p, comments: p.comments.filter((c) => c.id !== commentId) }
              : p
          ),
        })),

      incrementViews: (postId) =>
        set((s) => ({
          posts: s.posts.map((p) =>
            p.id === postId ? { ...p, views: p.views + 1 } : p
          ),
        })),

      // --- Projects ---
      addProject: (project) =>
        set((s) => ({ projects: [project, ...s.projects] })),

      updateProject: (id, updates) =>
        set((s) => ({
          projects: s.projects.map((p) => (p.id === id ? { ...p, ...updates } : p)),
        })),

      deleteProject: (id) =>
        set((s) => ({ projects: s.projects.filter((p) => p.id !== id) })),

      applyToProject: (projectId, applicant) =>
        set((s) => ({
          projects: s.projects.map((p) =>
            p.id === projectId
              ? { ...p, applicants: [...p.applicants, applicant] }
              : p
          ),
        })),

      updateApplicantStatus: (projectId, applicantId, status) =>
        set((s) => ({
          projects: s.projects.map((p) => {
            if (p.id !== projectId) return p;
            const updatedApplicants = p.applicants.map((a) =>
              a.id === applicantId ? { ...a, status } : a
            );
            // If accepted, add to members
            const accepted = updatedApplicants.find(
              (a) => a.id === applicantId && status === 'accepted'
            );
            const newMembers =
              accepted && !p.members.includes(accepted.userId)
                ? [...p.members, accepted.userId]
                : p.members;
            return { ...p, applicants: updatedApplicants, members: newMembers };
          }),
        })),
    }),
    {
      name: 'itpeople-data',
      skipHydration: true,
    }
  )
);
