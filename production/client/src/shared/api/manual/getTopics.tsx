import { graphql } from "@/shared/api/graphql";

const getTopics = graphql(`
    query topics($title: String) {
        topics(title: $title) {
            title
        }
    }
`);