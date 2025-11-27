import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppDispatch, RootState } from './store';

export interface Library {
  _id?: string;
  name: string;
  description?: string;
  logo?: string;
  subdomain: string;
  customDomain?: string;
  emoji?: string;
  topbar?: string;
  email?: string;
  phone?: string;
  address?: string;
  website?: string;
  timings?: string;
  about?: {
    mission?: string;
    vision?: string;
    whyChooseUs?: Array<{
      title?: string;
      description?: string;
      icon?: string;
    }>;
  };
  testimonials?: Array<{
    name: string;
    role?: string;
    library?: string;
    image?: string;
    rating?: number;
    text: string;
  }>;
  shifts?: Array<{
    name: string;
    time: string;
    icon?: string;
    color?: string;
    description?: string;
    features?: string[];
    status?: string;
    capacity?: string;
    staffCount?: number;
  }>;
  facilities?: Array<{
    name: string;
    description?: string;
    icon?: string;
    color?: string;
  }>;
  gallery?: Array<{
    title: string;
    description?: string;
    image?: string;
    icon?: string;
    color?: string;
  }>;
  faqs?: Array<{
    question: string;
    answer: string;
    icon?: string;
  }>;
  privacyPolicy?: {
    content?: string;
    lastUpdated?: Date;
  };
  terms?: {
    content?: string;
    lastUpdated?: Date;
  };
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface LibraryState {
  libraries: Library[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: LibraryState = {
  libraries: null,
  loading: false,
  error: null,
};

export const librarySlice = createSlice({
  name: 'library',
  initialState,
  reducers: {
    setLibraries: (state, action: PayloadAction<Library[] | null>) => {
      state.libraries = action.payload || null;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
    addLibrary: (state, action: PayloadAction<Library>) => {
      if (state.libraries) {
        state.libraries = [...state.libraries, action.payload];
      } else {
        state.libraries = [action.payload];
      }
      state.loading = false;
      state.error = null;
    },
    updateLibrary: (state, action: PayloadAction<Library>) => {
      if (state.libraries) {
        state.libraries = state.libraries.map(lib =>
          lib._id === action.payload._id ? { ...lib, ...action.payload } : lib
        );
      }
      state.loading = false;
      state.error = null;
    },
    deleteLibrary: (state, action: PayloadAction<string>) => {
      if (state.libraries) {
        state.libraries = state.libraries.filter(lib => lib._id !== action.payload);
      }
      state.loading = false;
      state.error = null;
    },
  },
});

export const fetchLibraries = () => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  dispatch(setError(null));
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/libraries/getAllLibraries`);
    if (response.data.success) {
      dispatch(setLibraries(response.data.data.libraries));
    } else {
      dispatch(setError(response.data.message));
    }
  } catch (error) {
    dispatch(setError((error as Error).message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Helper function to convert a Library or Partial<Library> into FormData
function toLibraryFormData(library: any): FormData {
  const formData = new FormData();
  for (const key in library) {
    const value = library[key];
    // Skip undefined and null, but allow empty strings (especially for customDomain)
    if (value === undefined || value === null) continue;

    // Handle File/Image type 'logo' or 'image' fields if present
    if ((key === 'logo' || key === 'image') && typeof value !== 'string') {
      formData.append(key, value);
      continue;
    }

    // For complex objects & arrays except File, stringify them
    if (typeof value === 'object' && !(value instanceof File) && !(value instanceof Blob)) {
      formData.append(key, JSON.stringify(value));
    } else {
      // Include empty strings for customDomain to allow clearing it
      if (key === 'customDomain' || value !== '') {
        formData.append(key, value);
      }
    }
  }
  return formData;
}

export const createLibrary = (library: Library) => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  dispatch(setError(null));
  try {
    const formData = toLibraryFormData(library);
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/libraries/newLibrary`,
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );
    if (response.data && response.data.success) {
      dispatch(addLibrary(response.data.data.library || library));
    } else {
      dispatch(setError(response.data?.message || 'Failed to create library'));
    }
  } catch (error) {
    dispatch(setError((error as Error).message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const updateLibrary = (id: string, updates: Partial<Library>) => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  dispatch(setError(null));
  try {
    const formData = toLibraryFormData(updates);
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/libraries/updateLibrary/${id}`,
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );
    if (response.data && response.data.success) {
      dispatch(updateLibraryAction(response.data.data.library || { _id: id, ...updates }));
    } else {
      dispatch(setError(response.data?.message || 'Failed to update library'));
    }
  } catch (error) {
    dispatch(setError((error as Error).message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const deleteLibrary = (id: string) => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  dispatch(setError(null));
  try {
    const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/libraries/deleteLibrary/${id}`);
    if (response.data && response.data.success) {
      dispatch(deleteLibraryAction(id));
    } else {
      dispatch(setError(response.data?.message || 'Failed to delete library'));
    }
  } catch (error) {
    dispatch(setError((error as Error).message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Export actions separately for use in thunks
export const {
  setLibraries,
  setLoading,
  setError,
  addLibrary,
  updateLibrary: updateLibraryAction,
  deleteLibrary: deleteLibraryAction,
} = librarySlice.actions;

export const selectLibraries = (state: RootState) => state.library.libraries;
export const selectLoading = (state: RootState) => state.library.loading;
export const selectError = (state: RootState) => state.library.error;

/**
 * Helper function to find a library by subdomain or customDomain
 * This allows matching libraries by either their subdomain or custom domain
 */
export const findLibraryBySubdomainOrCustomDomain = (
  libraries: Library[] | null,
  identifier: string
): Library | undefined => {
  if (!libraries || !Array.isArray(libraries) || !identifier) return undefined;
  
  // Normalize identifier for comparison
  const normalizedIdentifier = identifier.toLowerCase().trim();
  
  // First check if it matches a subdomain
  let found = libraries.find(lib => 
    lib?.subdomain?.toLowerCase().trim() === normalizedIdentifier
  );
  
  // If not found, check if it matches a customDomain
  if (!found) {
    found = libraries.find(lib => 
      lib?.customDomain?.toLowerCase().trim() === normalizedIdentifier
    );
  }
  
  return found;
};

export default librarySlice.reducer;