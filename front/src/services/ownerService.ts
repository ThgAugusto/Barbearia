import { Create, Owner } from "../types/owner";
import ConnectionAPI from "./api/connectionAPI";

function OwnerService() {
    const create = async (owner: Create): Promise<Owner> => {
        const response = await ConnectionAPI.post('/owners', owner);
        return response.data;
    }

    return {create}
}

export default OwnerService;