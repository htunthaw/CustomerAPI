import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { Customer, CustomerRequestDTO, CustomerResponseDTO } from '../model/customer';
import { UserFriendlyError } from '../util/error';
import fetch from 'node-fetch';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const customerRequest =  (req.body && req.body.hasOwnProperty('customerCardNo')) ? req.body as CustomerRequestDTO : undefined;
    let statusCode : number;
    let responseBody: object;

    if(typeof customerRequest === 'undefined'){
        statusCode = 400;
        responseBody = new UserFriendlyError('Invalid payload');
        
    }else{
        const baseUrl = process.env["BASE_URL"];
        const moduleName = process.env["API_MODULE_NAME"];
        const headers = {
            "app-id": process.env["APP_ID"]!,
            "cache-control": process.env["CACHE_CONTROL"]!,
            "postman-token": process.env["POSTMAN_TOKEN"]!
        }
    
        const response = await fetch(`${baseUrl}/${moduleName}/${customerRequest.customerCardNo}`, {headers} );
        const jsonObject = await response.json();
        statusCode = jsonObject.hasOwnProperty("error") ? 400 : 200;
        responseBody = jsonObject.hasOwnProperty("error") ? new UserFriendlyError(jsonObject.error) : CustomerResponseDTO.from(<Customer>jsonObject); 
    }
           
    context.res = {
        status: statusCode, 
        body: responseBody 
    };
   
};

export default httpTrigger;