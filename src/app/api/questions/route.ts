import { NextResponse } from 'next/server'

import Question from '../../../models/question'
import connectDB from '../../../utils/db/db'


export async function GET () {

  const client = await connectDB()
  let res = null;

  const noDataResponse = NextResponse.json(
    { message: 'Failed to retrieve questions.', data: null },
    { status: 500 }
  )

  try {
    res = await Question.find({})
  } catch (e: any) {
    return noDataResponse;
  }

  if (!res) {
    return noDataResponse;
  }

  return NextResponse.json(
    {
      message: 'Questions successfully fetched.',
      data: res
    },
    { status: 200 }
  )
}