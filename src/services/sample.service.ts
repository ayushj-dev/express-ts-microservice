import { GetSampleParams } from "@/types/sample.types";

export class SampleService {

  constructor() { }

  getSample(data: GetSampleParams) {
      return `Sample data: ${data.text}`;
  }
}
