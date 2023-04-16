import Head from "next/head"
import { useResult } from "../../services/results"
import Editor, { DiffEditor } from '@monaco-editor/react';
import { Feed } from "../../components/feed/feed";
import { ResultDetail } from "../../components/result/result-detail";
import Link from "next/link";
import { Private } from "../../components/private";

const ResultDetails = ({ id }) => {
    const { data: result } = useResult(id)

    return (
        <Private>
            <Head>
                <title>Viewer | Result Details</title>
            </Head>
            <h1 className="text-2xl">{result?.name}</h1>
            <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                    <div className="flex flex-col gap-4 w-1/2 bg-white p-4 rounded-md">
                        <ResultDetail result={result} />
                    </div>
                    <div className="flex flex-col gap-4 w-1/2 bg-white p-4 rounded-md">
                        <div>
                            <h2 className="text-xl">
                                Pipeline
                            </h2>
                            <p className="mt-1 text-sm text-gray-500">
                                Pipeline configuration used for this run.
                            </p>
                        </div>
                        <Feed config={result?.config} />
                    </div>
                </div>
                <div className="flex flex-col gap-4 bg-white p-4 rounded-md">
                    <div>
                        <h2 className="text-xl">
                            Output Comparison
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                            Shows the differences between the original transcript (Reference) and the transcript generated by the model (Hypothesis).
                        </p>
                        <Link href={`/results/diff/${result?.id}`} className="underline text-sky-600 text-sm">
                            View larger
                        </Link>
                    </div>
                    <div className="flex">
                        <div className="w-full">
                            <h3 className="text-lg">Reference</h3>
                        </div>
                        <div className="w-full">
                            <h3 className="text-lg">Hypothesis</h3>
                        </div>
                    </div>
                    <DiffEditor
                        className="py-4 h-[20vh]"
                        original={result?.reference}
                        modified={result?.hypothesis}
                    />
                </div>
                {result?.referenceSegments && result?.hypothesisSegments &&
                    <div className="flex flex-col gap-4 bg-white p-4 rounded-md">
                        <div>
                            <h2 className="text-xl">
                                Segment Comparison
                            </h2>
                            <p className="mt-1 text-sm text-gray-500">
                                Shows the differences between each segment. This is only available if the ground truth for each segment exists.
                            </p>
                            <Link href={`/results/diff-segments/${result?.id}`} className="underline text-sky-600 text-sm">
                                View larger
                            </Link>
                        </div>
                        <div className="flex">
                            <div className="w-full">
                                <h3 className="text-lg">Reference</h3>
                            </div>
                            <div className="w-full">
                                <h3 className="text-lg">Hypothesis</h3>
                            </div>
                        </div>
                        <DiffEditor
                            className="py-4 h-[20vh]"
                            original={JSON.stringify(result?.referenceSegments.map(s => ({ index: s.index, text: s.text })), null, 4)}
                            modified={JSON.stringify(result?.hypothesisSegments.map(s => ({ index: s.index, text: s.text })), null, 4)}
                        />
                    </div>
                }
                <div className="flex flex-col gap-4 bg-white p-4 rounded-md">
                    <div>
                        <h2 className="text-xl">
                            Configuration
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                            Configuration used for this run.
                        </p>
                    </div>
                    {result?.config &&
                        <Editor
                            className="py-4 h-[70vh]"
                            language="json"
                            value={JSON.stringify(result?.config, null, 4)}
                        />
                    }
                </div>
            </div>
        </Private>
    )
}

export async function getServerSideProps({ query }) {
    return {
        props: {
            id: query.id
        },
    }
}

export default ResultDetails