import { graphql } from "@/shared/api/graphql";

const logoutUser = graphql(`
    mutation logout {
        logout
    }
`);