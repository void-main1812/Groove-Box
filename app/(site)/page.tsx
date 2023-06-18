import Header from "@/app/components/Header";
import ListItems from "@/app/components/ListItems";

export const revalidate = 0;

export default function Home() {
    return (
        <div className='
        bg-neutral-900
        rounded-lg
        w-full
        h-full
        overflow-hidden
        overflow-y-auto
        '>
            <Header>
                <div className='mb-2'>
                    <h1
                        className='
                    text-3xl
                    text-white
                    font-semibold
                    '
                    >
                        Welcome Back
                    </h1>
                    <div
                        className='
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    xl:grid-cols-3
                    2xl:grid-cols-4
                    gap-3
                    mt-4
                    '
                    >
                        <ListItems
                            image="/images/liked.jpg"
                            name="Liked Songs"
                            href="liked"
                        />
                    </div>
                </div>
            </Header>
            <div className='mt-2 mb-7 px-6' >
                <div className='flex justify-between items-center' >
                    <h1 className='text-white text-2xl font-semibold' >Newest Songs</h1>
                </div>
                <div>
                    List of songs
                </div>
            </div>
        </div>
    )
}
