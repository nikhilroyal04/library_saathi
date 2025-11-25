import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppDispatch, RootState } from './store';

export interface Library {
  _id?: string;
  name: string;
  description?: string;
  logo?: string;
  subdomain: string;
  emoji?: string;
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
  }
  finally {
    dispatch(setLoading(false));
  }
};

export const { setLibraries, setLoading, setError } = librarySlice.actions;

export const selectLibraries = (state: RootState) => state.library.libraries;
export const selectLoading = (state: RootState) => state.library.loading;
export const selectError = (state: RootState) => state.library.error;

export default librarySlice.reducer;