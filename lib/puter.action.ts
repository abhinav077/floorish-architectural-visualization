import { puter } from "@heyputer/puter.js";
import { uploadImageToHosting } from "./puter.hosting";
import { isHostedUrl } from "./utils";
import {getOrCreateHostingConfig} from "./puter.hosting";

export const signIn = async () => await puter.auth.signIn();

export const signOut = async () => puter.auth.signOut();

export const getCurrentUser = async () => {
    try {
        return await puter.auth.getUser();
    }
    catch {
        return null;
    }
}

export const createProject = async({item} : CreateProjectParams): Promise<DesignItem | null | undefined> => {
    const projectId = item.id;

    const hosting = await getOrCreateHostingConfig();

    const hostedSource = projectId ?
        await uploadImageToHosting({
            hosting, url: item.sourceImage, projectId, label: "source" 
        }) : null;

    const hostedRender = projectId && item.renderedImage ?
        await uploadImageToHosting({
            hosting, url: item.renderedImage, projectId, label: "rendered" 
        }) : null;

    const resolvedSource = hostedSource?.url || (isHostedUrl(item.sourceImage) 
        ? item.sourceImage
        : null);

    if(!resolvedSource) {
        console.warn(`Fai ${projectId}`);
        return null;
    }

    const resolvedRender = hostedRender?.url
        ? hostedRender.url
        : item.renderedImage && isHostedUrl(item.renderedImage)
            ? item.renderedImage
            : undefined;

    const {
        sourcePath : _sourcePath,
        renderedPath : _renderedPath,
        publicPath : _publicPath,
        ...rest
    } = item;
    
    const payload = {
        ...rest,
        sourceImage: resolvedSource,
        renderedImage: resolvedRender,
    }


    try {
        // call the puter worker to save project in kv store.
        return payload;
    } catch (e) {
        console.log(`Failed to save project: ${e}`);
    }
}