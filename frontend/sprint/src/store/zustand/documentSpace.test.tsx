import axios from "axios";
import useBindStore from ".";

describe('DocSpace zustand', () => {
  it('asdf', async () => {
    axios.post = jest.fn();
    axios.delete = jest.fn();
    const a = useBindStore.getState().linkDocumentSpace;
    a(1, 1, true);
    a(1, 1, false);
  });
});