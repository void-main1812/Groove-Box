import {Song} from "@/types";
import usePlayer from "@/hooks/usePlayer";
import useAuthModal from "@/hooks/useAuthModal";
import {useUser} from "@/hooks/useUser";

const useOnPlay = (songs: Song[]) => {
    const player = usePlayer();
    const authModal = useAuthModal();
    const {user} = useUser();

    const onPlay = (id: string) => {
        if (!user) {
            authModal.onOpen();
            return;
        }

        player.setId(id);
        player.setIds(songs.map(song => song.id));
    }

    return onPlay;
}

export default useOnPlay;