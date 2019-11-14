require 'rails_helper'

RSpec.describe Message, type: :model do
  describe '#create' do
    context 'can save メッセージを保存できる場合' do
      it 'is valid with content メッセージがあれば保存できる' do
        # message = build(:message, image: "")
        # expect(message).to be_valid
        expect(build(:message, image: nil)).to be_valid
      end

      it 'is valid with image 画像があれば保存できる' do
        # message = build(:message, content: "")
        # expect(message).to be_valid
        expect(build(:message, content: nil)).to be_valid
      end

      it 'is valid with content and image メッセージと画像があれば保存できる' do
        # message = build(:message)
        # expect(message).to be_valid
        expect(build(:message)).to be_valid
      end
    end

    context 'can not save メッセージを保存できない場合' do
      it 'is invalid without content and image メッセージも画像も無いと保存できない' do
        # message = build(:message, content: "", image: "")
        message = build(:message, content: nil, image: nil)
        message.valid?
        expect(message.errors[:content]).to include("を入力してください")
      end

      it 'is invaid without group_id group_idが無いと保存できない' do
        # message = build(:message, group: "")
        message = build(:message, group_id: nil)
        message.valid?
        expect(message.errors[:group]).to include("を入力してください")
      end

      it 'is invaid without user_id user_idが無いと保存できない' do
        # message = build(:message, user: "")
        message = build(:message, user_id: nil)
        message.valid?
        expect(message.errors[:user]).to include("を入力してください")
      end
    end

  end
end