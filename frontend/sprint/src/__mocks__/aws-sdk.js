class ManagedUpload {
  constructor() {};
  promise = jest.fn();
};

class MockS3 {
  constructor() {};
  getSignedUrl = jest.fn();
  listObjects = jest.fn().mockImplementationOnce((params, callback) => {
    callback(null, { Contents: [{ Key: 'file1.csv' }] });
  }).mockImplementationOnce((params, callback) => {
    throw new Error('testError');
  });
};

MockS3.ManagedUpload = ManagedUpload;

class MockCognitoIdentityCredentials {
  constructor() {
    this.k = 'a';
  };
};

const mockAWS = {
  config: {
    region: 'a',
    credentails: 'a'
  },
  CognitoIdentityCredentials: MockCognitoIdentityCredentials,
  S3: MockS3
};

export default mockAWS;
