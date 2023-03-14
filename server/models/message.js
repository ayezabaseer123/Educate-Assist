class Message{
    constructor(message_id,conversation_id,senderId , text){
        this.message_id=message_id,
        this.conversation_id=conversation_id;
        this.senderId=senderId;
        this.text=text;
       

}
}
module.exports=Message;