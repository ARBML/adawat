const url = 'https://web-production-a8ed.up.railway.app/datasets';
const contributers_url = 'https://web-production-a8ed.up.railway.app/datasets/tags?features=Added by'

function linkuize(text, link, short = true) {
    if (link != undefined && link != 'nan')
        return `<a href = "${link}" target="_blank" class="#${(short) ? "shorterText " : ""}underline"> ${text}</a>`;
    else return 'Not Available';
}
datasetNames = {}

async function getNames(index){
    const url = `https://masader-web-service.herokuapp.com/datasets/${index}?features=Name`
    console.log(url)
    try {
        let res = await axios({
             url: url,
             method: 'get',
         }) 
         return res.data["Name"]
     }
     catch (err) {
         console.error(err);
     }

}

async function getDatasetsLinks(datasets, ItemIndex){
    datasets.split(",").forEach((index)=>{
        if (Number.isInteger(parseInt(index))){
            getNames(index).then((res)=>{
                var element = document.getElementById(`eval${ItemIndex}`)
                if (element.innerHTML.length == 0)
                    element.innerHTML += linkuize(res.trim(),`https://arbml.github.io/masader/card?id=${index}`)
                else
                    element.innerHTML += ","+linkuize(res.trim(),`https://arbml.github.io/masader/card?id=id=${index}`)
            })
        }
    })
    return ""
}
function getIcon(text) {
    const lower = text.toLowerCase();
    if (icons[lower] != undefined || icons[lower] != 'nan') {
        return icons[lower];
    } else {
        return text;
    }
}
function itemize(text) {
    tasks = text.split(',');
    output = '<ul class="list-group list-group-flush bg-transparent">';
    for (let i = 0; i < tasks.length; i++) {
        output +=
            '<li class="list-group-item bg-transparent">' +
            tasks[i].trim().replaceAll(' ', '-') +
            '</li>';
    }
    output += '</ul>';
    return output;
}

function createColab(link){
    return `<a href=${link}> <img src="https://colab.research.google.com/assets/colab-badge.svg" width = '400px' target = "_blank"></a>`
}

function badgeRender(text) {
    text = text.toString().toLowerCase();
    if (text.toLowerCase() == 'free')
        return '<span class="text-sm font-medium  px-2.5 py-0.5" style="background-color: #00800030; color:green; font-weight:bold; border-radius:5px">Free</span>';
    else if (text == 'upon-request')
        return '<span class="badge bg-info px-2.5 py-2">Free Upon Request</span>';
    else return '<span class="badge bg-danger px-2.5 py-2">Paid</span>';
}

function reformat_numbers(num) {
    values = num.split(',');
    if (values.length < 2) {
        return num;
    } else if (values.length == 2) {
        return values[0] + 'K';
    } else return values[0] + 'M';
}

function reformat_version(num) {
    values = num.split('.');
    if (num == "nan")
        return ""
    if (values.length == 2) {
        return num+".0";
    } else if (values.length == 1) {
        return num+".0.0";
    } else return num;
}

async function getDetails(id) {
  return axios.get(url+"/"+id).then(response => response.data)
}

async function getOGimage(url) {
    if (url.includes("github"))
    {
        let owner = url.split("/")
        let preview = `https://opengraph.githubassets.com/1/${owner[3]}/${owner[4]}`
        return preview
    }
    else
    return ""
}

async function fomratDetails(data, index){
    await getOGimage(data['Link']).then(res => {
        return (res) ? image = res : image = ""

    })
  return '<div class="grid grid-cols-4">'+
            '<div class="col-span-1">'+
                // '<a class="text-center fs-3">'+ linkuize(data['Paper Title'], data['Paper Link'])+'</a>'+
                // '<a href = "'+data['Link']+'" target="_blank" class="shorterText underline mx-4" style="width: 70%"> '+data['Link']+'</a>'+
                '<a style="line-height: 9rem;" target="_blank" href="' + data['Link'] + '"><img style="width: 70%;" class="shorterText underline mx-4" src="'+ image +'"/></a>'+

            '</div>'+
            '<div class="col-span-3 relative ">'+
                '<div class="grid grid-rows-6 grid-flow-col ">'+
                    ' <div class="grid grid-cols-2 ">'+
                        '<span class="text-gray-400">Name</span>'+
                        '<span class="text-gray-800">'+data['Name'] +'</span>'+
                    '</div>'+
                    ' <div class="grid grid-cols-2">'+
                        '<span class=" text-gray-400">Created At</span>'+
                        '<span class=" text-gray-800">'+data['Release Year'] +'</span>'+
                    '</div>'+
                    ' <div class="grid grid-cols-2 ">'+
                        '<span class="text-gray-400">Version</span>'+
                        '<span class="text-gray-800">'+data['Version'] +'</span>'+
                    '</div>'+
                    ' <div class=" grid grid-cols-2 ">'+
                        '<span class="text-gray-400">License</span>'+
                        '<span class="text-gray-800">'+data['License'] +'</span>'+
                    '</div>'+
                    ' <div class="grid grid-cols-2  ">'+
                        '<span class="text-gray-400">Supported language(s)</span>'+
                        '<span class="text-gray-800">'+data['Supported language(s)'] +'</span>'+
                    '</div>'+
                    ' <div class="grid grid-cols-2 ">'+
                        '<span class="text-gray-400">Evaluated datasets</span>'+
                        '<span class="text-gray-800"'+ `id = "eval${index}"`+'>'+ await getDatasetsLinks(data['Evaluated datasets'], index) +'</span>'+
                    '</div>'+
                    ' <div class="grid grid-cols-2  ">'+
                        '<span class="text-gray-400">Accessibility</span>'+
                        '<span class="text-gray-800">'+data['Accessibility'] +'</span>'+
                    '</div>'+
                    ' <div class="grid grid-cols-2  ">'+
                        '<span class="text-gray-400">Language</span>'+
                        '<span class="text-gray-800">'+data['Programming Language'] +'</span>'+
                    '</div>'+
                    ' <div class="grid grid-cols-2  ">'+
                        '<span class="text-gray-400">GitHub Repo</span>'+
                        '<span class="text-gray-800">'+data['GitHub Repo'] +'</span>'+
                    '</div>'+
                    ' <div class="grid grid-cols-2  ">'+
                        '<span class="text-gray-400">Pricing</span>'+
                        '<span class="text-gray-800">'+data['Pricing'] +'</span>'+
                    '</div>'+
                    ' <div class="grid grid-cols-2  ">'+
                        '<span class="text-gray-400">Tool Type</span>'+
                        '<span class="text-gray-800">'+data['Tool Type'] +'</span>'+
                    '</div>'+
                    ' <div class=" grid grid-cols-2 ">'+
                        '<span class="text-gray-400">Interface</span>'+
                        '<span class="text-gray-800">'+data['Interface'] +'</span>'+
                    '</div>'+
                    
                '</div>'+
                '<div class="collapse-footer flex justify-end gap-x-5 mt-7">'+
                '<a href="'+`card?id=${index}`+ '" class="underline font-normal">Details</a>'+
                '<a href="'+data["Paper Link"]+'" target="_blank" class="underline font-normal">Paper</a>'+
            '</div>'+
        '</div>'
   // })
 }

 async function getContributersNum()
 {
    try {
        let res = await axios({
             url: contributers_url,
             method: 'get',
         }) 
         return res.data["Added by"].length
     }
     catch (err) {
         console.error(err);
     }
}

axios
    .get(url, {
        onDownloadProgress: (progressEvent) => {},
    })
    .then(function (response) {
        let headers = [];
        let headersWhiteList = [
            'No.',
            'Name',
            'Links',
            'Year',
            'License',
            'Version',
            'Language',
            'Paper Link',
            'Access',
            'Tasks',
        ];
        $('.loading-spinner').hide();
        headers.push({
          index: 0,
          className:      'fa-solid button table-cell flex rounded-tl-lg',
          orderable:      false,
          data:           null,
          defaultContent: ''
      
      })
        for (let i = 0; i < headersWhiteList.length; i++) {
            headers.push({
                index: 1+i,
                title: headersWhiteList[i].toUpperCase(),
            });
        }
        // console.log(headers[headers.length - 1].className = "rounded-tr-lg ")
        let rows = response.data;
        // console.log(headers);

        //  Createing table data
   
        let dataset = [];
        for (let index = 0; index < rows.length; index++) {
            const row = rows[index];
            var link_host = ""
            if (row["Link"].includes("github"))
                 link_host += linkuize("GitHub", row['Link']);
            else
                link_host += linkuize("External Link", row['Link']);
            if (row['Colab link'] != 'nan') {
                link_host += '</br>' + createColab(row['Colab link']);
            }
             

            dataset.push({
                0: index + 1,
                1: index + 1,
                2: linkuize(row['Name'], `card.html?id=${row['Id']}`, false),
                3: link_host,
                4: parseInt(row['Release Year']),
                5: row["License"],
                6: reformat_version(row["Version"]),
                7: row["Programming Language"],
                8: linkuize(row['Paper Title'], row['Paper URL']),
                9: badgeRender(row['Pricing']),
                10: itemize(row['Tasks']),
            });
        }

        $.extend($.fn.dataTableExt.oSort, {
            'data-custom-pre': function (a) {
                // console.log(a);
            },
        });

        $(document).ready(function () {
            document.getElementById('numDatasets').textContent = dataset.length;
            getContributersNum().then(res => 
                document.getElementById('numContributers').textContent = res)
            let table = $('#table').DataTable({
                data: dataset,
                columns: headers,
                lengthMenu: [
                    [10, 100, 200, 300, 400, -1],
                    [10, 100, 200, 300, 400, 'All'],
                ],
                scrollCollapse: true,
                paging: true,
                pagingType: 'numbers',
                bInfo: false,
                dom: 'pt',
                createdRow: function (row, data, dataIndex) {
                    $('td:eq(`10`)', row).css('min-width', '200px');
                },
                order: [[1, 'asc']],
                searching: true
              });
          
             // opening and closing details
             $('#table tbody').on('click', 'td.button', function () {
                var tr = $(this).closest('tr');
                var row = table.row( tr );
                if ( row.child.isShown() ) {
                    row.child.hide();
                    tr.removeClass('shown');
                }
                else {
                    id = row.data()[1];
                    loader = $(".loading-spinner").html();
                    row.child(loader).show();
                    getDetails(id).then(async (response) =>
                      row.child(await fomratDetails(response, id)).show()
                    );
                    tr.addClass('shown');
                }
              });
        });
    })
    .catch(function (error) {
        console.log(error);
    });
