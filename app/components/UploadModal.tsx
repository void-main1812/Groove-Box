'use client'

import React, {useState} from 'react';
import Modal from "@/app/components/Modal";
import useUploadModal from "@/hooks/useUploadModal";
import {FieldValues, Form, SubmitHandler, useForm} from "react-hook-form";
import Input from "./Input";
import Button from "@/app/components/Button";
import toast from "react-hot-toast";
import {useUser} from "@/hooks/useUser";
import uniqid from "uniqid";
import {useSupabaseClient} from "@supabase/auth-helpers-react";
import {useRouter} from "next/navigation";

const UploadModal = () => {

    const [isLoading, setIsLoading] = useState(false)

    const uploadModal = useUploadModal();
    const {user} = useUser();
    const supabaseClient = useSupabaseClient();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            title: '',
            author: '',
            song: null,
            image: null
        }
    })

    const onChange = (open: boolean) => {
        if (!open) {
            reset();
            uploadModal.onClose();
        }
    }

    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        try {
            setIsLoading(true)
            const image = values.image?.[0]
            const song = values.song?.[0]

            if (!image || !song || !user) {
                toast.error("Missing Fields")
                return;
            }

            const uniqueID = uniqid()

            // Upload Songs

            const {
                data: songData,
                error: songError,
            } = await supabaseClient.storage.from('songs').upload(`song-${values.title}-${uniqueID}`, song, {
                cacheControl: '3600',
                upsert: false,
            })

            if (songError) {
                setIsLoading(false)
                return toast.error("Failed Song Upload")
            }

            // Upload Images
            const {
                data: imageData,
                error: imageError,
            } = await supabaseClient.storage.from('images').upload(`image-${values.title}-${uniqueID}`, image, {
                cacheControl: '3600',
                upsert: false,
            })

            if (imageError) {
                setIsLoading(false)
                return toast.error("Failed image Upload")
            }

            const {error: supabaseError} = await supabaseClient.from('songs').insert({
                user_id: user.id,
                title: values.title,
                author: values.author,
                image_path: imageData.path,
                song_path: songData.path,
            })

            if (supabaseError) {
                setIsLoading(false)
                return toast.error(supabaseError.message)
            }

            router.refresh()
            setIsLoading(false);
            toast.success("Song Uploaded")
            reset();
            uploadModal.onClose();

        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Modal isOpen={uploadModal.isOpen} onChange={onChange} title="Add a Song"
               description="Upload any song you want">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-y-4"
            >
                <Input
                    id="title"
                    disabled={isLoading}
                    {...register('title', {required: true})}
                    placeholder="Song Title"
                />
                <Input
                    id="author"
                    disabled={isLoading}
                    {...register('author', {required: true})}
                    placeholder="Song Author"
                />
                <div>
                    <div className='pb-1'>
                        Select a Song File
                    </div>
                    <Input
                        id="song"
                        type="file"
                        accept=".mp3"
                        disabled={isLoading}
                        {...register('song', {required: true})}
                        placeholder="Song Author"
                    />
                </div>
                <div>
                    <div className='pb-1'>
                        Select an Image
                    </div>
                    <Input
                        id="image"
                        type="file"
                        accept="image/*"
                        disabled={isLoading}
                        {...register('image', {required: true})}
                        placeholder="Song Author"
                    />
                </div>
                <Button
                    disabled={isLoading}
                    type="submit"
                    className='rounded-md'
                >
                    Upload Song
                </Button>
            </form>
        </Modal>
    );
};

export default UploadModal;