import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import TextAreaField from '~/components/form-controls/TextAreaField';

function UpdateForm({ onToggle, question, onUpdate }) {
  const schema = yup.object().shape({
    question: yup.string().required('Vui lòng nhập câu hỏi'),
    answer: yup.string().required('Vui lòng nhập câu trả lời'),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      question: question?.question ?? '',
      answer: question?.answer ?? '',
    },
  });

  const handleCancel = () => {
    onToggle();
  };

  const handleUpdate = async (data) => {
    await onUpdate(data);
    onToggle();
  };

  return (
    <div className="w-140 rounded-md bg-white px-10 py-5">
      <h2 className="font-medium">Thêm dữ liệu cho Chatbot</h2>
      <hr className="mb-5 mt-2"></hr>
      <form className="space-y-5" onSubmit={handleSubmit(handleUpdate)}>
        <div>
          <TextAreaField
            rows={5}
            readOnly
            id="question"
            label="Câu hỏi"
            placeholder="Nhập câu hỏi..."
            register={{ ...register('question') }}
            errorMessage={errors.question?.message}
          />
        </div>
        <div>
          <TextAreaField
            rows={5}
            id="answer"
            label="Câu trả lời"
            placeholder="Nhập câu trả lời..."
            register={{ ...register('answer') }}
            errorMessage={errors.answer?.message}
          />
        </div>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={handleCancel}
            className="rounded bg-red-500 px-5 py-2 text-sm text-white hover:bg-opacity-80"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="rounded bg-green-500 px-5 py-2 text-sm text-white hover:bg-opacity-80"
          >
            Cập nhật
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateForm;
