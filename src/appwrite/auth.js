import {Client,Account,ID} from 'appwrite'
import conf from '../conf/conf'


export class Authservice{

    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        
        this.account = new Account(this.client)    
    }

    async createAccount ({email,password,name}){
        try {
             const userAccount = await this.account.create(ID.unique(),email,password,name)
             if(userAccount){
                return this.login({email,password});
             }
             else{
                return userAccount;
             }
        } catch (error) {
            throw error;
        }
    }

    async login({email,password}){
        try {
            return await this.account.createEmailPasswordSession(email, password);

        } catch (error) {
            throw(error);
        }
    }

    async getCurrentUser(){
        try {

            return await this.account.get()
            
            
        } catch (error) {
            console.log("Appwrite service error :: getCurrentUser :: error",error)
        }

        return null;
    }

    async logout(){
        try {
        return await this.account.deleteSessions()
            
        } catch (error) {
            console.log("Appwrite service error :: logout :: error",error)
        }
    }

    async recoverPassword(email){
        try {
            return await this.account.createRecovery(email,`http://localhost:5173/forget-password`)
        } catch (error) {
            console.log(error)
        }
    }
    async createNewPassword(userId,secret,password){
        try {
            return await this.account.updateRecovery(userId,secret,password)
            
        } catch (error) {
            console.log(error)
        }
    }
}

const authService = new Authservice()

export default authService