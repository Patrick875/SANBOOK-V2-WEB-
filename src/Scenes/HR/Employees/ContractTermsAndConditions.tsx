import FroalaEditor from "react-froala-wysiwyg";
import "froala-editor/js/plugins/save.min.js";
import ContractSectionInfo from "./ContractSectionInfo";
import { useState } from "react";
import { IoAddCircle } from "react-icons/io5";
import { LuDelete } from "react-icons/lu";
import { CheckIcon } from "@heroicons/react/24/outline";
import instance from "../../../API";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { createContractSelector, updateStoredTerms } from "./contractSlice";
import { term } from "../../../types";

interface editorprops {
	prevContent?: string;
	getData: (e: string, id: string) => void;
	id: string;
}

const ContractTerms = ({ getData, id, prevContent }: editorprops) => {
	const [model, setModel] = useState<string>(() => {
		return prevContent || "";
	});
	const editorConfig = {
		toolbarButtons: {
			moreText: { buttons: ["bold", "italic", "underline"] },
			moreMisc: {
				buttons: ["undo", "redo"],
				align: "right",
			},
		},
		saveInterval: 3500,
		events: {
			"save.before": function (html: string) {
				console.log("event and stuff", html);
				getData(id, html);
			},
		},
	};

	return (
		<>
			<FroalaEditor
				model={model}
				onModelChange={(e: string) => {
					setModel(e);
				}}
				config={editorConfig}
			/>
		</>
	);
};

const ContractTermsAndConditions = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const [success, setSuccess] = useState<boolean | null>(false);
	const contractDetails = useAppSelector(createContractSelector);
	const dispatch = useAppDispatch();
	//const [initialTerms, setInitialTerms] = useState<term[]>([]);
	const [terms, setTerms] = useState<term[]>(() =>
		contractDetails.contractclauses
			? contractDetails.contractclauses
			: [
					{
						id: crypto.randomUUID(),
						text: "",
					},
			  ]
	);
	const addTerm = () => {
		setTerms([...terms, { id: crypto.randomUUID(), text: "" }]);
	};
	const removeTerm = (id: string) => {
		setTerms(terms.filter((term: term) => (term.id !== id ? term : null)));
		if (
			contractDetails.contractclauses &&
			contractDetails.contractclauses.length !== 0
		) {
			dispatch(
				updateStoredTerms([
					...contractDetails.contractclauses.filter((term: term) =>
						term.id !== id ? term : null
					),
				])
			);
		}
	};
	// const [termTexts, setTermTexts] = useState<string[]>(
	// 	terms.map((term) => term.text)
	// );

	const getData = (id: string, e: string) => {
		console.log("hey I am running ... it's working");
		console.log("this is the id", id);
		console.log("this is the current text", e);
		dispatch(updateStoredTerms(terms));

		setTerms((terms: term[]) =>
			terms.map((term: term) => (term.id === id ? { ...term, text: e } : term))
		);
		dispatch(
			updateStoredTerms([
				...terms.map((term: term) =>
					term.id === id ? { ...term, text: e } : term
				),
			])
		);
		console.log("terms and terms and terms ", terms);
	};

	console.log(terms);

	const createContract = async () => {
		const submitableTerms = () => {
			let contractclauses: string[] = [];
			const employee: number | null = contractDetails.employee
				? contractDetails.employee.id
				: null;

			if (
				contractDetails.contractclauses &&
				contractDetails.contractclauses.length !== 0
			) {
				contractclauses = contractDetails.contractclauses.map(
					(term: term) => term.text
				);
			}
			return { ...contractDetails, contractclauses, employee };
		};
		const data = submitableTerms();
		console.log(data);
		setLoading(true);
		await instance
			.post("/hr/contracts", data)
			.then((res) => {
				console.log(res);
				setSuccess(true);
			})
			.catch((err) => {
				console.log(err);
				setSuccess(false);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	return (
		<>
			<div className="p-8 basis-2/4">
				<p className="py-1 my-4 font-bold ">Terms and Conditions</p>

				<div>
					{terms &&
						terms.map((term: term, i: number) => (
							<div>
								<p className="my-1 text-sm font-medium">Term {i + 1}</p>
								<ContractTerms
									key={term.id}
									id={term.id}
									prevContent={term.text}
									getData={getData}
								/>
								{terms.length !== 1 && (
									<button
										onClick={() => removeTerm(term.id)}
										className="flex gap-2 px-4 py-1 my-2 bg-pink-800 rounded-sm text-primary-white ">
										<LuDelete className="w-4 h-4 " />
										<p className="text-xs">Remove</p>
									</button>
								)}
							</div>
						))}
					<div className="flex justify-center w-full ">
						<button
							onClick={addTerm}
							className="flex gap-2 px-4 py-1 my-2 rounded-sm text-primary-white bg-hr-side ">
							<IoAddCircle className="w-4 h-4 " />
							<p className="text-xs">Add</p>
						</button>
					</div>
				</div>
				<div className="flex justify-end">
					<button
						onClick={createContract}
						className="flex items-center gap-2 px-6 py-1 text-xs font-bold bg-teal-900 text-primary-white">
						{" "}
						<p>Submit</p>
						<CheckIcon className="w-4 h-4" />{" "}
					</button>
				</div>
			</div>
			<ContractSectionInfo
				title="Terms and conditions"
				content="Terms and conditions regarding the work ethic at XXXXXX"
			/>
		</>
	);
};

export default ContractTermsAndConditions;
