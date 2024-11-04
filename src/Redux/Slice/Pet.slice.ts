import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Pet } from "../../types/Pet.types";
import {
  fetchAllPets,
  addPet,
  deletePet as deletePetApi,
  updatePet as updatePetApi,
  FetchPetsResponse
} from "../../api/PetApi";

interface PetState {
  pets: Pet[];
  loading: boolean;
  error: string | null;
  selectedPet: Pet | null;
  totalPages: number;
}

const initialState: PetState = {
  pets: [],
  loading: false,
  error: null,
  selectedPet: null,
  totalPages: 1,
};

export const fetchPets = createAsyncThunk(
  "pets/fetchAll",
  async (
    { currentPage, search }: { currentPage: number; search: string },
    thunkAPI
  ) => {
    const response = await fetchAllPets(currentPage, search);
    if (!response) return thunkAPI.rejectWithValue("Failed to fetch pets");
    return response; 
  }
);

export const addNewPet = createAsyncThunk(
  "pets/add",
  async (formData: FormData, thunkAPI) => {
    const response = await addPet(formData);
    if (!response) return thunkAPI.rejectWithValue("Failed to add pet");
    return response; 
  }
);

export const deletePet = createAsyncThunk(
  "pets/delete",
  async (
    { id, currentPage, search }: { id: string; currentPage: number; search: string },
    thunkAPI
  ) => {
    const response = await deletePetApi(id, currentPage, search);
    if (!response) return thunkAPI.rejectWithValue("Failed to delete pet");
    return response;
  }
);

export const updatePet = createAsyncThunk(
  "pets/update",
  async (
    { id, formData }: { id: string; formData: FormData },
    thunkAPI
  ) => {
    const response = await updatePetApi(id, formData);
    if (!response) return thunkAPI.rejectWithValue("Failed to update pet");
    return response;
  }
);

const petSlice = createSlice({
  name: "pets",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchPets.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      fetchPets.fulfilled,
      (state, action: PayloadAction<FetchPetsResponse>) => {
        state.loading = false;
        state.pets = action.payload.data;
        state.totalPages = action.payload.pagination.totalPages; 
      }
    );
    builder.addCase(fetchPets.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(
      addNewPet.fulfilled,
      (state, action: PayloadAction<Pet>) => {
        state.pets.push(action.payload);
      }
    );
    builder.addCase(deletePet.fulfilled, (state, action: PayloadAction<FetchPetsResponse | null>) => {
      if (action.payload) {
        state.pets = action.payload.data;
      }
    });
    builder.addCase(
      updatePet.fulfilled,
      (state, action: PayloadAction<Pet>) => {
        const index = state.pets.findIndex(pet => pet.id === action.payload.id);
        if (index !== -1) {
          state.pets[index] = action.payload;
        }
      }
    );
  },
});

export const petReducer = petSlice.reducer;
