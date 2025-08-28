"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation";


function Filter() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    function handleFilter(filter) {
        const params = new URLSearchParams(searchParams);

        params.set("capacity", filter)
        router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    }
    return (
        <div className="border border-colors-primary-800 flex" >
            <button className="px-5 py-2 hover:bg-colors-primary-700 " onClick={() => handleFilter("all")} >
                All cabins
            </button>
            <button className="px-5 py-2 hover:bg-colors-primary-700 " onClick={() => handleFilter("small")}  >
                1&mdash;3 guests
            </button>
            <button className="px-5 py-2 hover:bg-colors-primary-700 " onClick={() => handleFilter("medium")} >
                4&mdash;7 guests onClick={() => handleFilter("all")}
            </button>
            <button className="px-5 py-2 hover:bg-colors-primary-700 " onClick={() => handleFilter("large")}>
                8&mdash;12
            </button>

        </div>
    )
}

export default Filter