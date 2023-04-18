import { Button } from "../form/button"
import dayjs from "dayjs"
import { useEffect, useMemo, useState } from "react"
import { Input } from "../form/input"
import { TextArea } from "../form/textarea"
import { saveExperiment } from "../../services/experiments"

export const ExperimentDetail = ({ experiment }) => {

    const getAverageScore = (experiment, scoreType) => {
        if(!experiment) return 0

        var scores = experiment.results.map(e => e.scores.find(s => s.type === scoreType)?.value)

        const sum = scores.reduce((a, b) => a + b, 0);
        const avg = (sum / scores.length) || 0;

        return avg.toFixed(2)
    } 

    const avgBleu = useMemo(() => {
        return getAverageScore(experiment, 'BLEU')
    }, [experiment])

    const avgSemDist = useMemo(() => {
        return getAverageScore(experiment, 'SemDist')
    }, [experiment])

    const avgWer = useMemo(() => {
        return getAverageScore(experiment, 'WER')
    }, [experiment])

    const [isEditing, setIsEditing] = useState(false)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")

    useEffect(() => {
        setName(experiment?.name)
        setDescription(experiment?.description)
    }, [experiment])

    if (!experiment) {
        return <></>
    }

    const submitExperiment = async () => {
        await saveExperiment({
            ...experiment,
            name,
            description
        })

        setIsEditing(false)
    }

    const cancel = () => {
        setName(experiment?.name)
        setDescription(experiment?.description)
        setIsEditing(false)
    }

    return (
        <>
            <h3 className="text-lg">Details</h3>
            <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                    <dt className="text-sm font-medium text-gray-500">Name</dt>
                    {isEditing ?
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            <Input defaultValue={name} onChange={(e) => setName(e.target.value)} />
                        </dd>
                        :
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{name}</dd>
                    }
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                    <dt className="text-sm font-medium text-gray-500">Description</dt>
                    {isEditing ?
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            <TextArea value={description || ""} placeholder="Description of the current run" onChange={(e) => setDescription(e.target.value)} />
                        </dd>
                        :
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{description}</dd>
                    }
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                    <dt className="text-sm font-medium text-gray-500">Created</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{dayjs(experiment?.createdAt).format('DD.MM.YY - HH:mm')}</dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                    <dt className="text-sm font-medium text-gray-500">Runs</dt>
                    <dd className="mt-1 text-sm font-bold text-gray-900 sm:col-span-2 sm:mt-0">{experiment.results.length}</dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                    <dt className="text-sm font-medium text-gray-500">Average BLEU</dt>
                    <dd className="mt-1 text-sm font-bold text-gray-900 sm:col-span-2 sm:mt-0">{avgBleu}</dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                    <dt className="text-sm font-medium text-gray-500">Average WER</dt>
                    <dd className="mt-1 text-sm font-bold text-gray-900 sm:col-span-2 sm:mt-0">{avgWer}</dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                    <dt className="text-sm font-medium text-gray-500">Average SemDist</dt>
                    <dd className="mt-1 text-sm font-bold text-gray-900 sm:col-span-2 sm:mt-0">{avgSemDist}</dd>
                </div>
            </dl>

            <div className="flex justify-start gap-2">
                {!isEditing &&
                    <Button primary onClick={() => setIsEditing(true)}>Edit</Button>
                }
                {isEditing &&
                    <>
                        <Button primary onClick={submitExperiment}>Save</Button>
                        <Button secondary onClick={cancel}>Cancel</Button>
                    </>
                }
            </div>
        </>
    )
}