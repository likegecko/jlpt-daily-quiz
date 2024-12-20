type VerificationTemplate = {
  code: number | string;
};

const VerificationTemplate = ({ code }: VerificationTemplate) => (
  <div>
    <h1>{code}</h1>
  </div>
);

export default VerificationTemplate;
