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
  pets: Pet[] ;  // This is an array of Pet objects
  selectedPet: Pet | null; // A selected pet, if any
  totalPages: number; // Total pages for pagination
}

const initialState: PetState = {
  pets: [],
  selectedPet: null,
  totalPages: 1,
};

// Async action to fetch all pets
export const fetchPets = createAsyncThunk(
  "pets/fetchAll",
  async (
    { currentPage, search }: { currentPage?: number; search?: string },
    thunkAPI
  ) => {
    const response = await fetchAllPets(currentPage, search);
    if (!response) return thunkAPI.rejectWithValue("Failed to fetch pets");
    return response; // Make sure response structure is correct
  }
);

// Async action to add a new pet
export const addNewPet = createAsyncThunk(
  "pets/add",
  async (formData: any, thunkAPI) => {
    const response = await addPet(formData);
    if (!response) return thunkAPI.rejectWithValue("Failed to add pet");
    return response; // Make sure this returns a single Pet object
  }
);

// Async action to delete a pet
export const deletePet = createAsyncThunk(
  "pets/delete",
  async (
    { id, currentPage, search }: { id: string; currentPage?: number; search?: string },
    thunkAPI
  ) => {
    const response = await deletePetApi(id, currentPage, search);
    if (!response) return thunkAPI.rejectWithValue("Failed to delete pet");
    return response; // Ensure response structure is correct
  }
);

// Async action to update a pet
export const updatePet = createAsyncThunk(
  "pets/update",
  async (
    { id, formData }: { id: string; formData:any },
    thunkAPI
  ) => {
    const response = await updatePetApi(id, formData);
    if (!response) return thunkAPI.rejectWithValue("Failed to update pet");
    return response; // Ensure response is a Pet object
  }
);

// Slice to manage pet data
const petSlice = createSlice({
  name: "pets",
  initialState,
  reducers: {}, // You can define additional synchronous actions if needed
  extraReducers: builder => {
    builder.addCase(
      fetchPets.fulfilled,
      (state, action: PayloadAction<FetchPetsResponse>) => {
        state.pets = action.payload.data;  
        state.totalPages = action.payload.pagination.totalPages;
      }
    );
    builder.addCase(
      addNewPet.fulfilled,
      (state, action: PayloadAction<Pet>) => {
        state.pets.push(action.payload);  
      }
    );
    builder.addCase(deletePet.fulfilled, (state, action: PayloadAction<FetchPetsResponse | null>) => {
      if (action.payload && action.payload.data) {
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
