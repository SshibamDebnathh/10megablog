import { Client, Databases, Query,ID, Storage} from "appwrite";
import conf from "../conf/conf";


export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);

    }

    async createPost({ title, featuredImage, status, userId, content, slug }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.log("appwrite service Error ::", error)
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    featuredImage,
                    status,
                    content,
                }
            )
        } catch (error) {
            console.log("appwrite update post service Error::",error)
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                
            )
        } catch (error) {
            throw(error)
        }
    }

    async deletePost(slug){
        try {
             await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            console.log('Appwrite deletePost service :: error',error)
            return false
        }
    }

    async getPosts(queries =[Query.equal('status','active')]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries

            )
        } catch (error) {
            throw(error)
        }
    }

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file,
                
            )
        } catch (error) {
            throw (error)
        }
    }
    async listFiles(){
        try {
            const res = await this.bucket.listFiles(
                conf.appwriteBucketId,
            
            )
            console.log(res)
        } catch (error) {
            throw (error)
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId

            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }
    getFileView(fileId){
      
      return this.bucket.getFileView(
                conf.appwriteBucketId,
                fileId,
                )
    }
}

const service = new Service()

export default service