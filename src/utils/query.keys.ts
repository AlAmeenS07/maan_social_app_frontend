

export const queryKeys = {
    user: ["user"],
    adminUsers: <T>(params: T) => ["adminUsers", params],
    adminPosts: <T>(params: T) => ["adminPosts", params],
    profile: ["profile"],
    location: ["location"],
    adminUser: ["userDetail"],
    userPosts: ["userPosts"],
    adminUserPosts: ["adminUserPosts"]
}