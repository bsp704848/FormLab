import TextField from './TextField'
import TextAreaField from './TextAreaField'
import CheckBoxField from './CheckBoxField'
import RadioField from './RadioField'
import SelectField from './SelectField'
import AutoCompletField from './AutoCompleteField'
import DateField from './DateField'
import ParagraphField from './ParagraphField'
import HeaderField from './HeaderField'
import ButtonField from './ButtonField'
import FileUploadField from './FileUploadField';
import NumberField from './NumberField';

export const fieldRegistry = {
    text:TextField,
    textarea:TextAreaField,
    checkbox:CheckBoxField,
    radio:RadioField,
    select:SelectField,
    autocomplete:AutoCompletField,
    date:DateField,
    paragraph:ParagraphField,
    header:HeaderField,
    button: ButtonField,
    number: NumberField,
    file: FileUploadField,
}