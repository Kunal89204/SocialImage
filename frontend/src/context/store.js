import  {create} from "zustand"
import {createAuthSlice} from './slices/authSlice'
import {createFollowSlice} from './slices/followSlice'

export const useAuthStore = create((set) => ({
    ...createAuthSlice(set)
  }));

export const useFollowStore = create((set) => ({
    ...createFollowSlice(set),
  }));

  