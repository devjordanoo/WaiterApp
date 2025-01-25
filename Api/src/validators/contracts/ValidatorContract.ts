import { ZodObject, ZodError } from "zod";

interface ValidatorContract {
	schema: ZodObject<any>;
	validate(data: any): void;
}

export default ValidatorContract;
