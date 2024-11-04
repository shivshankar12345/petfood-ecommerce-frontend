import { toast } from "react-toastify";
import useApi from "../hooks/useApi";
import { Pet } from "../types/Pet.types";

const { makeAPICallWithOutData,makeAPICallWithData } = useApi();

export type FetchPetsResponse = {
  data: Pet[];
  pagination: {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
  };
};

export const fetchAllPets = async (
  currentPage: number,
  search: string
): Promise<FetchPetsResponse | null> => {
  try {
    const { isError, response, error } = await makeAPICallWithOutData(
      "get",
      `/product-pet/getAllpets?page=${currentPage}&limit=5&search=${search}`
    );

    if (isError || !response) {
      toast.error(error?.message || "Error in fetching pets");
      return null;
    }

    const petsResponse = response as { data: FetchPetsResponse };
    console.log("Pets fetched successfully");
    return petsResponse.data;
  } catch (error: any) {
    toast.error(error?.message || "An unexpected error occurred");
    console.error(error);
    return null;
  }
};


export const AddPet = async (
  name: string,
  description: string
): Promise<Pet | null> => {
  try {
    const payload = { name, description };
    const { isError, response, error } = await makeAPICallWithData(
      "post",
      "/product-pet/createPet",
      payload
    );

    if (isError) {
      console.error(error?.message || "Error adding pet");
      return null;
    }

    console.log("Pet added successfully");
    return response?.data;
  } catch (error: any) {
    console.error(error?.message || "An unexpected error occurred");
    return null;
  }
};

export const DeletePet = async (
  id: string,
  currentPage: number,
  search: string
): Promise<FetchPetsResponse | null> => {
  try {
    const { isError, error } = await makeAPICallWithOutData(
      "delete",
      `/product-pet/delete?id=${id}`
    );

    if (isError) {
      console.error(error?.message || "Error in deleting pet");
      return null;
    }

    console.log("Pet deleted successfully");
    return await fetchAllPets(currentPage, search);
  } catch (error: any) {
    console.error(error?.message || "An unexpected error occurred");
    return null;
  }
};

export const UpdatePet = async (
  id: string,
  name: string,
  description: string
): Promise<Pet | null> => {
  try {
    const payload = { name, description };
    const { isError, response, error } = await makeAPICallWithData(
      "put",
      `/product-pet/updatePet?id=${id}`,
      payload
    );

    if (isError) {
      console.error(error?.message || "Error updating pet");
      return null;
    }

    console.log("Pet updated successfully");
    return response?.data;
  } catch (error: any) {
    console.error(error?.message || "An unexpected error occurred");
    return null;
  }
};
