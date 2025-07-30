import { CreateUserParams, GetMenuParams, SignInParams } from "@/type";
import { Account, Avatars, Client, Databases, ID, Query, Storage } from "react-native-appwrite";

export const appwriteConfig = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT! ,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
    platform: "com.clebert.FoodOrdering",
    databaseId: "687b75250009db76f32f",
    bucketId: '68824788003dcc17da49',
    userCollectionId: "687b7576000b279cf600",
    categoriesCollectionId: '688242d6003c3e52f1bc',
    menuCollectionId: '68879d730031973089b2',
    customizationsCollectionId: '68824576000059ad722d',
    menuCustomizationsCollectionId: '68879f7a0029dc30fd19'
}

export const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform)
    
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
const avatars = new Avatars(client);

export const createUser = async ({name, email, password}: CreateUserParams) => {
    try {
        const newAccount = await account.create(ID.unique(), email, password, name);

        if(!newAccount) throw Error;

        await signIn({email, password});

        const avatarUrl = avatars.getInitialsURL(name)
        
        return await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                name,
                email,
                avatar: avatarUrl,
            }
        )
    
    } catch (error) {
     throw new Error(error as string);   
    }
}

export const signIn = async ( {email, password}: SignInParams) => {
    try {
        const session = await account.createEmailPasswordSession(email, password);
    } catch (error) {
        throw new Error(error as string);
    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();
        if(!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
            
        )
        if(!currentUser) throw Error;
        return currentUser.documents[0];
    } catch (error) {
        console.log(error)
        throw new Error(error as string);
    }
}

export const getMenu = async ({category, query}: GetMenuParams) => {
    try{
        const queries: string[] = [];

        if(category) queries.push(Query.equal('categories', category));
        if(query) queries.push(Query.search('name', query));

        const menus = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.menuCollectionId,
            queries

        )

        return menus.documents;
    }catch (error) {
        throw new Error(error as string);
    }
}

export const getCategories = async () => {
    try {
        const categories = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.categoriesCollectionId,
            
        )

        return categories.documents;
    } catch (error) {
        throw new Error(error as string);
        
    }
}