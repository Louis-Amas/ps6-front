export interface Attachment {
  type:
    {
      name: {
        type: any,
        required: [true, 'Attachement name is required']
      },
      data: {
        type: any,
        require: [true, 'data is needed']
      }
    }
  ;

}
