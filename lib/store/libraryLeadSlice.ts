import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppDispatch, RootState } from './store';

export interface LibraryLead {
  _id?: string;
  fullName: string;
  mobileNumber: string;
  library: string;
  message: string;
  startDate: Date;
  status: 'new' | 'contacted' | 'qualified' | 'converted';
  createdAt?: Date;
  updatedAt?: Date;
}

interface LibraryLeadState {
  leads: LibraryLead[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: LibraryLeadState = {
  leads: null,
  loading: false,
  error: null,
};

export const libraryLeadSlice = createSlice({
  name: 'libraryLead',
  initialState,
  reducers: {
    setLeads: (state, action: PayloadAction<LibraryLead[] | null>) => {
      state.leads = action.payload || null;
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
    addLead: (state, action: PayloadAction<LibraryLead>) => {
      if (state.leads) {
        state.leads = [...state.leads, action.payload];
      } else {
        state.leads = [action.payload];
      }
      state.loading = false;
      state.error = null;
    },
    updateLead: (state, action: PayloadAction<LibraryLead>) => {
      if (state.leads) {
        state.leads = state.leads.map(lead =>
          lead._id === action.payload._id ? { ...lead, ...action.payload } : lead
        );
      }
      state.loading = false;
      state.error = null;
    },
    deleteLead: (state, action: PayloadAction<string>) => {
      if (state.leads) {
        state.leads = state.leads.filter(lead => lead._id !== action.payload);
      }
      state.loading = false;
      state.error = null;
    },
  },
});

// Async thunks for API calls
export const fetchLeads = () => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  dispatch(setError(null));
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/library-leads/getAllLeads`);
    if (response.data.success) {
      dispatch(setLeads(response.data.data.leads || response.data.data));
    } else {
      dispatch(setError(response.data.message || 'Failed to fetch leads'));
    }
  } catch (error) {
    dispatch(setError((error as Error).message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchLeadById = (id: string) => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  dispatch(setError(null));
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/library-leads/getLeadById/${id}`);
    if (response.data.success) {
      const lead = response.data.data.lead || response.data.data;
      if (lead) {
        // Update the lead in the list if it exists
        dispatch(updateLeadAction(lead));
      }
      return { success: true, data: lead };
    } else {
      dispatch(setError(response.data.message || 'Failed to fetch lead'));
      return { success: false, error: response.data.message };
    }
  } catch (error) {
    const errorMessage = (error as Error).message;
    dispatch(setError(errorMessage));
    return { success: false, error: errorMessage };
  } finally {
    dispatch(setLoading(false));
  }
};

export const createLead = (lead: Omit<LibraryLead, '_id' | 'createdAt' | 'updatedAt'>) => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  dispatch(setError(null));
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/library-leads/newLead`,
      lead
    );
    if (response.data && response.data.success) {
      const newLead = response.data.data.lead || response.data.data;
      dispatch(addLead(newLead || lead as LibraryLead));
      return { success: true, data: newLead };
    } else {
      dispatch(setError(response.data?.message || 'Failed to create lead'));
      return { success: false, error: response.data?.message };
    }
  } catch (error) {
    const errorMessage = (error as Error).message;
    dispatch(setError(errorMessage));
    return { success: false, error: errorMessage };
  } finally {
    dispatch(setLoading(false));
  }
};

export const updateLeadThunk = (id: string, updates: Partial<LibraryLead>) => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  dispatch(setError(null));
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/library-leads/updateLead/${id}`,
      updates
    );
    if (response.data && response.data.success) {
      const updatedLead = response.data.data.lead || response.data.data || { _id: id, ...updates };
      dispatch(updateLeadAction(updatedLead));
      return { success: true, data: updatedLead };
    } else {
      dispatch(setError(response.data?.message || 'Failed to update lead'));
      return { success: false, error: response.data?.message };
    }
  } catch (error) {
    const errorMessage = (error as Error).message;
    dispatch(setError(errorMessage));
    return { success: false, error: errorMessage };
  } finally {
    dispatch(setLoading(false));
  }
};

export const deleteLead = (id: string) => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  dispatch(setError(null));
  try {
    const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/library-leads/deleteLead/${id}`);
    if (response.data && response.data.success) {
      dispatch(deleteLeadAction(id));
      return { success: true };
    } else {
      dispatch(setError(response.data?.message || 'Failed to delete lead'));
      return { success: false, error: response.data?.message };
    }
  } catch (error) {
    const errorMessage = (error as Error).message;
    dispatch(setError(errorMessage));
    return { success: false, error: errorMessage };
  } finally {
    dispatch(setLoading(false));
  }
};

// Export actions separately for use in thunks
export const {
  setLeads,
  setLoading,
  setError,
  addLead,
  updateLead: updateLeadAction,
  deleteLead: deleteLeadAction,
} = libraryLeadSlice.actions;

// Export thunk with cleaner name
export const updateLead = updateLeadThunk;

// Selectors
export const selectLeads = (state: RootState) => state.libraryLead.leads;
export const selectLoading = (state: RootState) => state.libraryLead.loading;
export const selectError = (state: RootState) => state.libraryLead.error;

export default libraryLeadSlice.reducer;
