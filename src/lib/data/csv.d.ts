// Local CSV module declarations to satisfy svelte-check
declare module '*.csv' {
    const content: any[];
    export default content;
}

declare module '$lib/data/years.csv' {
    const content: any[];
    export default content;
}

declare module '$lib/data/roles.csv' {
    const content: any[];
    export default content;
}

declare module '$lib/data/size.csv' {
    const content: any[];
    export default content;
}

declare module '$lib/data/orgs.csv' {
    const content: any[];
    export default content;
}

declare module '$lib/data/youtube-videos.csv' {
    const content: any[];
    export default content;
}
