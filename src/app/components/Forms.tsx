import { FloatingLabel, Form } from "react-bootstrap";

/**
 * Form
 */
export type Form = {
	type?: string;
	controlId: string;
	label: string;
	placeholder: string;
	autoComplete?: string;
	disabled?: boolean;
	required?: boolean;
	readOnly?: boolean;
	plaintext?: boolean;
	defaultValue?: string;
	as?: React.ElementType;
	style?: React.CSSProperties;
	ariaLabel?: string;
	optionKey?: { key: string; value: string };
};

interface FormProps {
	forms: Form[];
	data?: Record<string, string>;
	option?: Record<string, string>[];
}
/**
 * Forms
 * textareaとselectはasで指定
 * @param param0
 * @returns
 */
export function Forms({ forms, data, option }: FormProps): JSX.Element {
	return (
		<>
			{forms.map((form, index) => (
				<FloatingLabel key={index} controlId={form.controlId} label={form.label} className="mb-3">
					{form.as === "select" ? (
						<Form.Select aria-label={form.ariaLabel} defaultValue={data?.[form.controlId]}>
							<option>{form.placeholder}</option>
							{option?.map((item, index) => (
								<option key={index} value={form.optionKey ? item[form.optionKey.key] : undefined}>
									{form.optionKey ? item[form.optionKey.value] : undefined}
								</option>
							))}
						</Form.Select>
					) : (
						<Form.Control
							type={form.type}
							name={form.controlId}
							placeholder={form.placeholder}
							autoComplete={form.autoComplete}
							required={form.required}
							disabled={form.disabled}
							readOnly={form.readOnly}
							plaintext={form.plaintext}
							defaultValue={data?.[form.controlId]}
						/>
					)}
				</FloatingLabel>
			))}
		</>
	);
}
