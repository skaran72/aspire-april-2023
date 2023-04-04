import express, {Request, Response} from "express";
import _ from 'lodash';
import generateUpdateStatement from "../services/generateUpdateStatement";

const router = express.Router();

router.post('/generate-mutation', (request: Request, response: Response) => {
    const {document, mutation} = request.body;

    // Checking for invalid inputs and throwing HTTP Notfound status code
    if(_.isEmpty(document)){
        return response.status(400).json({
            error: 'Document is required in the request'
        })
    }

    if(_.isEmpty(mutation)){
        return response.status(400).json({
            error: 'Mutation is required in the request'
        })
    }

    const result = generateUpdateStatement(document, mutation);
    response.status(200).json({result})
})

export default router;
