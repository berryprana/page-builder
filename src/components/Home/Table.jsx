import React from "react";
import { Link } from "react-router-dom";
const HomeTable = (props) => {
    const thead_list = [
        {
            title: 'Page Info'
        },
        {
            title: 'Last Update'
        },
        {
            title: 'Actions'
        }
    ]

    const thead = thead_list.map((list) =>
        <th key={list.title} className={"py-3 px-6 " + (list.title == 'Actions' ? 'text-center' : 'text-left')}>{list.title}</th>
    )

    const pages = props.data.length > 0 ? props.data.map((page) => {
        return (
            <tr key={page._id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">
                    <div className="flex items-center">
                        <div className="mr-2">
                        </div>
                        <span className="font-medium">{page.title}</span>
                    </div>
                </td>
                <td className="py-3 px-6 text-left">
                    <div className="flex items-center">
                        <span className="font-medium">{page.updatedAt} (bug)</span>
                    </div>
                </td>
                <td className="flex flex-col py-3 px-6 space-y-2 items-center">
                    <Link to={`/editor/${page._id}`} className="w-full bg-cyan-400 text-center hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded">
                        Open
                    </Link>
                    <button onClick={() => props.deletePage(page._id)} className="w-full text-black border border-black font-bold py-2 px-4 rounded">
                        Delete
                    </button>
                </td>
            </tr>
        )
    }) : <tr className="border-b border-gray-200 hover:bg-gray-100">
        <td className="py-3 px-6 text-left whitespace-nowrap">
            Empty
        </td>
    </tr>

    return (
        <div className="">
            <div className="flex items-center justify-center font-sans">
                <div className="w-full">
                    <div className="bg-white shadow-md rounded my-6 table-wrp block max-h-96">
                        <table className="table-auto overflow-scroll w-full">
                            <thead className="sticky top-0">
                                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                    {thead}
                                </tr>
                            </thead>
                            <tbody className="text-gray-600 text-sm font-light">
                                {pages}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeTable