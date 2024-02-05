import { useState } from "react";
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import instance from "../API";
import toast from "react-hot-toast";

interface Props {
	show: boolean;
	setShow: (show: boolean) => void;
	itemType: string;
	itemId: number;
	deleteUrl: string;
}
interface error {
	status: string;
	message: string;
}

const DeleteItemModal = ({
	show,
	setShow,
	itemId,
	itemType,
	deleteUrl,
}: Props) => {
	const [success, setSuccess] = useState<boolean>(false);
	const [error, setError] = useState<error | null>(null);
	const deleteItem = async () => {
		await instance
			.delete(`${deleteUrl}/${itemId}`)
			.then(() => {
				setSuccess(true);
			})
			.catch((err) => {
				setError({
					status: err.response.data.status,
					message: err.response.data.message,
				});
			})
			.finally(() => {
				if (error) {
					toast.error(error.message);
					setShow(false);
				} else {
					toast.success("Item delete complete !");
					setShow(false);
				}
			});
	};
	return (
		<>
			<Modal
				show={show}
				size="md"
				onClose={() => {
					setShow(false);
					setError(null);
					setSuccess(false);
				}}
				popup>
				<Modal.Header className="bg-primary-white" />
				<Modal.Body className="bg-primary-white">
					<div className="text-center ">
						<HiOutlineExclamationCircle className="mx-auto mb-4 text-gray-700 h-14 w-14 dark:text-gray-700" />
						<h3 className="mb-5 text-lg font-normal text-gray-700 dark:text-gray-700">
							Are you sure you want to delete {itemType}?
						</h3>
						<div className="flex justify-center gap-4">
							<Button
								color="failure"
								onClick={() => {
									deleteItem();
								}}>
								{"Yes, I'm sure"}
							</Button>
							<Button
								color="gray"
								onClick={() => {
									setShow(false);
									setError(null);
									setSuccess(false);
								}}>
								No, cancel
							</Button>
						</div>
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default DeleteItemModal;
