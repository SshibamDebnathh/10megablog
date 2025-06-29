import { Client,Users } from "node-appwrite";
import conf from "../conf/conf";


export class Clientservice {
    client = new Client()
    users

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
            .setKey(conf.appwriteApiKey)

        this.users = new Users(this.client)    
    }

    async searchUser (name){
       try {
        const res = await this.users.list(
            // [Query.equal('name',name)],
            // [Query.startsWith("name",name)],
            // [Query.endsWith('name',name)],
          
        )
        
        return res
       } catch (error) {
        console.log(error)
       }
    }
    async getProfile(userid){
        try {
            return await this.users.get(userid)
               
             
        } catch (error) {
            console.log(error)
        }
    }
}

const clientService = new Clientservice()

export default clientService