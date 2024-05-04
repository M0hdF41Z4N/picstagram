import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';



export default function AddPost({togglePopup}) {
  
    return ( <>
    
            <Popup trigger=
                {
                <button type='button' title='Create Post'>
                  {/* <img 
                      className="w-8 mr-6 text-black-light"
                      src={`/images/create-post-logo.png`}
                      alt={`create post`}
                  /> */}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-8 mr-6 text-black-light">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>

                </button>} 
                modal nested>
                {
                    close => (
                        <div class="col-span-full rounded-lg border border-blue-medium ">
                            <h3 class="block text-sm font-medium p-2 leading-6 border-b border-gray-primary text-gray-900 text-center">Create new post</h3>
                            {/* <label for="cover-photo" class="block text-sm font-extrabold leading-6 border-b border-gray-primary text-gray-900 text-center">Create new post</label> */}
                            <div class="mt-2 flex justify-center flex-col items-center gap-4 rounded-lg text-center  px-12 py-12">
                                
                                {/* <svg class="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clip-rule="evenodd" />
                                </svg> */}
                                <div className='flex justify-center'>   <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50">
                                        <path d="M 15 4 C 8.9365932 4 4 8.9365932 4 15 L 4 35 C 4 41.063407 8.9365932 46 15 46 L 35 46 C 41.063407 46 46 41.063407 46 35 L 46 15 C 46 8.9365932 41.063407 4 35 4 L 15 4 z M 16.740234 6 L 27.425781 6 L 33.259766 16 L 22.574219 16 L 16.740234 6 z M 29.740234 6 L 35 6 C 39.982593 6 44 10.017407 44 15 L 44 16 L 35.574219 16 L 29.740234 6 z M 14.486328 6.1035156 L 20.259766 16 L 6 16 L 6 15 C 6 10.199833 9.7581921 6.3829803 14.486328 6.1035156 z M 6 18 L 44 18 L 44 35 C 44 39.982593 39.982593 44 35 44 L 15 44 C 10.017407 44 6 39.982593 6 35 L 6 18 z M 21.978516 23.013672 C 20.435152 23.049868 19 24.269284 19 25.957031 L 19 35.041016 C 19 37.291345 21.552344 38.713255 23.509766 37.597656 L 31.498047 33.056641 C 33.442844 31.951609 33.442844 29.044485 31.498047 27.939453 L 23.509766 23.398438 L 23.507812 23.398438 C 23.018445 23.120603 22.49297 23.001607 21.978516 23.013672 z M 21.982422 24.986328 C 22.158626 24.988232 22.342399 25.035052 22.521484 25.136719 L 30.511719 29.677734 C 31.220922 30.080703 31.220922 30.915391 30.511719 31.318359 L 22.519531 35.859375 C 21.802953 36.267773 21 35.808686 21 35.041016 L 21 25.957031 C 21 25.573196 21.201402 25.267385 21.492188 25.107422 C 21.63758 25.02744 21.806217 24.984424 21.982422 24.986328 z"></path>
                                        </svg>
                                </div>

                                <div class="mt-4 flex text-sm leading-6 text-gray-600">
                                    {/* <label for="file-upload" class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                    <span>Upload a file</span>
                                    <input id="file-upload" name="file-upload" type="file" class="sr-only" />
                                    </label> */}
                                    <h1 class=" text-2xl ">Drag photos and videos here</h1>
                                </div>
                                    {/* <button type="button" className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8">Select from computer</button> */}
                                    <label for="file-upload" class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                    <span className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8 p-2">Select from computer</span>
                                    <input id="file-upload" name="file-upload" type="file" class="sr-only" />
                                    </label>
                                {/* <p class="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p> */}
                                
                            </div>
                        </div>
                    )
                }
            </Popup>
  
    </> );
}
