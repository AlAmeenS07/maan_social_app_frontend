
// pages/admin/Users.jsx

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "../../hooks/common/useDebounce";
import { useAdminPosts } from "../../hooks/admin/users/useAdminPosts";
import type { PostResponse } from "../../types/user/user.post";
import Swal from "sweetalert2";
import AdminLayout from "../../layout/AdminLayout";
import Pagination from "../../compponents/pagination";
import PostTable from "../../compponents/PostTable";
import { useAdminUsersStatus } from "../../hooks/admin/users/useAdminUsersStatus";
import { useAdminTogglePost } from "../../hooks/admin/post/useAdminTogglePost";



export default function AdminPosts() {

    const [searchParams, setSearchParams] = useSearchParams();

    const [page, setPage] = useState(Number(searchParams.get("page")) || 1)
    const [status, setStatus] = useState(searchParams.get("status") || "")
    const [search, setSearch] = useState(searchParams.get("search") || "")
    const [from, setFrom] = useState(searchParams.get("from") || "")
    const [to, setTo] = useState(searchParams.get("to") || "")
    const [limit, setLimit] = useState(searchParams.get("limit") || 10)

    const debouncedSearch = useDebounce(search, 300)

    const { data: response, isLoading } = useAdminPosts({ search: debouncedSearch, status, from, to, page, limit })
    const { mutate: toggleStatusMutate } = useAdminTogglePost({ search, status, from, to, page, limit })


    const [posts, setPosts] = useState<PostResponse[]>([]);

    useEffect(() => {
        if (response?.data?.posts) {
            setPosts(response.data?.posts);
        }
    }, [response, posts.length]);

    const totalPages = response?.data?.totalPages || 0

    useEffect(() => {
        setSearchParams({
            search: debouncedSearch || "",
            status: status || "",
            from: from || "",
            to: to || "",
            page: String(page) || "1",
            limit: String(limit) || "10"
        });
    }, [page, debouncedSearch, status, from, to, limit, setSearchParams]);

    async function changeStatus(id: string, status: boolean) {
        console.log("here-fun", id)
        const result = await Swal.fire({
            title: `${status ? "Unblock User" : "Block User"}`,
            text: `User will be ${status ? "unblocked" : "blocked"} !`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#6b7280",
            confirmButtonText: `${status ? "Yes, Unblock" : "Yes, Block"}`,
            cancelButtonText: "Cancel",
        })
        if (result.isConfirmed) {
            await toggleStatusMutate(id)
            setPosts((prev) => {
                return prev.map((p: PostResponse) => {

                    if (p.id === id) {
                        return {
                            ...p,
                            isListed: !p.isListed
                        };
                    }

                    return p;
                });
            });
        }
    }


    if (isLoading) {
        return (
            <AdminLayout>
                <div className="flex justify-center items-center h-64">
                    <div className="w-6 h-6 border-4 border-gray-300 border-t-purple-500 rounded-full animate-spin"></div>
                </div>
            </AdminLayout>
        );
    }


    return (
        <AdminLayout>
            <div className="space-y-6">

                {/* HEADER */}
                <div>
                    <h1 className="text-2xl font-semibold">Post Management</h1>
                    <p className="text-gray-500 text-sm">
                        Manage Posts, monitor activity, and handle post statuses.
                    </p>
                </div>

                {/* FILTERS */}
                <div className="flex items-center gap-3 flex-wrap">

                    {/* SEARCH (smaller now) */}
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search users..."
                        className="w-64 border rounded-lg px-4 py-2"
                    />

                    {/* STATUS */}
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="border px-4 py-2 rounded-lg"
                    >
                        <option value="">All Status</option>
                        <option value="active">active</option>
                        <option value="blocked">blocked</option>
                    </select>

                    {/* DATE RANGE GROUP */}
                    <div className="flex items-center gap-2 border rounded-lg px-2 py-1 bg-white">

                        <input
                            type="date"
                            value={from}
                            onChange={(e) => setFrom(e.target.value)}
                            className="outline-none text-sm"
                        />

                        <span className="text-gray-400 text-sm">→</span>

                        <input
                            type="date"
                            value={to}
                            onChange={(e) => setTo(e.target.value)}
                            className="outline-none text-sm"
                        />

                    </div>

                    {/* LIMIT */}
                    <select
                        value={limit}
                        onChange={(e) => {
                            setLimit(Number(e.target.value));
                            setPage(1)
                        }}
                        className="border px-3 py-2 rounded-lg"
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={15}>15</option>
                        <option value={20}>20</option>
                    </select>

                </div>
                {/* TABLE */}
                {/* <UserTable users={userData} changeStatus={changeStatus} /> */}
                <PostTable posts={posts} changeStatus={changeStatus}/>

                {/* PAGINATION */}
                {
                    totalPages > 1 &&
                    <div className="flex justify-center">
                        <Pagination
                            currentPage={page}
                            totalPages={totalPages}
                            setCurrentPage={setPage}
                        />
                    </div>
                }

            </div>
        </AdminLayout>
    );
}