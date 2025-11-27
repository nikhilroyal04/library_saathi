import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppDispatch, RootState } from './store';

// SaasLead interface - flexible schema that accepts any fields
// Required fields: subdomain, product
// All other fields are dynamic and accepted by backend (strict: false)
export interface Lead {
  _id?: string;
  subdomain: string; // Required
  product: string | { _id: string; name?: string }; // Required - can be ObjectId string or populated object
  createdOn?: string;
  updatedOn?: string;
  // Allow any additional dynamic fields
  [key: string]: any;
}

interface LeadState {
  leads: Lead[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: LeadState = {
  leads: null,
  loading: false,
  error: null,
};

export const leadSlice = createSlice({
  name: 'lead',
  initialState,
  reducers: {
    setLeads: (state, action: PayloadAction<Lead[] | null>) => {
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
    addLead: (state, action: PayloadAction<Lead>) => {
      if (state.leads) {
        state.leads = [...state.leads, action.payload];
      } else {
        state.leads = [action.payload];
      }
      state.loading = false;
      state.error = null;
    },
    updateLead: (state, action: PayloadAction<Lead>) => {
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
export const fetchLeads = (page: number = 1, limit: number = 20, search?: string, status?: string, product?: string, subdomain?: string) => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  dispatch(setError(null));
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(search && { search }),
      ...(status && { status }),
      ...(product && { product }),
      ...(subdomain && { subdomain })
    });
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/saas-leads/getAllSaasLeads?${params}`);
    if (response.data.success) {
      dispatch(setLeads(response.data.data.saasLeads || response.data.data));
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
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/saas-leads/getSaasLeadById/${id}`);
    if (response.data.success) {
      const lead = response.data.data;
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

// Create lead - accepts any fields, but subdomain and product are required
export const createLead = (lead: Partial<Lead> & { subdomain: string; product: string }) => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  dispatch(setError(null));
  try {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!apiBaseUrl) {
      const errorMsg = 'API base URL is not configured. Please set NEXT_PUBLIC_API_BASE_URL in environment variables.';
      console.error(errorMsg);
      dispatch(setError(errorMsg));
      return { success: false, error: errorMsg };
    }

    console.log('Creating lead with data:', lead);
    console.log('API URL:', `${apiBaseUrl}/saas-leads/newSaasLead`);

    const response = await axios.post(
      `${apiBaseUrl}/saas-leads/newSaasLead`,
      lead
    );

    console.log('API Response:', response.data);

    if (response.data && response.data.success) {
      const newLead = response.data.data;
      dispatch(addLead(newLead || lead as Lead));
      return { success: true, data: newLead };
    } else {
      const errorMsg = response.data?.message || 'Failed to create lead';
      dispatch(setError(errorMsg));
      console.error('Lead creation failed:', errorMsg);
      return { success: false, error: errorMsg };
    }
  } catch (error: any) {
    const errorMessage = error?.response?.data?.message || error?.message || 'Failed to create lead';
    console.error('Error creating lead:', error);
    console.error('Error details:', {
      message: error?.message,
      response: error?.response?.data,
      status: error?.response?.status
    });
    dispatch(setError(errorMessage));
    return { success: false, error: errorMessage };
  } finally {
    dispatch(setLoading(false));
  }
};

// Update lead - accepts any fields dynamically
export const updateLeadThunk = (id: string, updates: Partial<Lead>) => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  dispatch(setError(null));
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/saas-leads/updateSaasLead/${id}`,
      updates
    );
    if (response.data && response.data.success) {
      const updatedLead = response.data.data || { _id: id, ...updates };
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
    const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/saas-leads/deleteSaasLead/${id}`);
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
} = leadSlice.actions;

// Export thunk with cleaner name
export const updateLead = updateLeadThunk;

// Selectors
export const selectLeads = (state: RootState) => state.lead.leads;
export const selectLoading = (state: RootState) => state.lead.loading;
export const selectError = (state: RootState) => state.lead.error;

export default leadSlice.reducer;
