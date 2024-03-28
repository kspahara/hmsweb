import { FloatingLabel, Form } from "react-bootstrap";

export type Form = {
	type: string;
	controlId: string;
	label: string;
	placeholder?: string;
	autoComplete?: string;
	required?: boolean;
	readOnly?: boolean;
	plaintext?: boolean;
	defaultValue?: string;
};

export function Forms({ forms, data }: { forms: Form[]; data?: Record<string, string> }): JSX.Element {
	// console.log("data", data);
	return (
		<>
			{forms.map((form, index) => (
				<FloatingLabel key={index} controlId={form.controlId} label={form.label} className={"mb-3"}>
					<Form.Control
						type={form.type}
						name={form.controlId}
						placeholder={form.placeholder}
						autoComplete={form.autoComplete}
						required={form.required}
						readOnly={form.readOnly}
						plaintext={form.plaintext}
						defaultValue={data && data[form.controlId]}
					/>
				</FloatingLabel>
			))}
		</>
	);
}
