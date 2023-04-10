import Link from "next/link";
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { ListItem } from "../list/list-item";

export const ExperimentListItem = ({ id, name, description }) => (
    <ListItem>
        <>
            <Link href={`/experiments/${id}`} className="flex justify-between items-center w-full">
                <div className="flex flex-1 flex-col gap-1">
                    <div className="font-semibold truncate">
                        {name}
                    </div>
                    <div className="truncate text-gray-500 text-xs">{description}</div>
                </div>
                <div className="w-10 dark:bg-gray-800 p-1 rounded-full text-gray-400 hover:text-black dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    <ArrowRightIcon className="block h-5 w-5" />
                </div>
            </Link>
        </>
    </ListItem>
)